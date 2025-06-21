import torch
import torch.nn as nn
import torchvision.transforms as transforms
from torchvision import models
from torchvision.models.video import mvit_v2_s, MViT_V2_S_Weights

import numpy as np
import cv2
from PIL import Image
from io import BytesIO
import tempfile
import os
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def load_image_model(model_path: str):
    try:
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found: {model_path}")
        
        model = models.resnet50(weights=None)
        for param in model.parameters():
            param.requires_grad = False

        num_ftrs = model.fc.in_features
        model.fc = nn.Sequential(
            nn.Linear(num_ftrs, 1024),
            nn.BatchNorm1d(1024),
            nn.LeakyReLU(),
            nn.Dropout(0.5),
            nn.Linear(1024, 512),
            nn.BatchNorm1d(512),
            nn.LeakyReLU(),
            nn.Dropout(0.5),
            nn.Linear(512, 1),
            nn.Sigmoid()
        )

        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        model.load_state_dict(torch.load(model_path, map_location=device))
        model = model.to(device)
        model.eval()
        logger.info(f"Image model loaded successfully on {device}")
        return model, device
    except Exception as e:
        logger.error(f"Error loading image model: {str(e)}")
        raise

def preprocess_image(img_array, target_size=(224, 224)):
    try:
        if img_array is None:
            raise ValueError("Image array is None")
        
        img = cv2.resize(img_array, target_size)
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        
        transform = transforms.Compose([
            transforms.ToPILImage(),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ])
        tensor_img = transform(img_rgb).unsqueeze(0)  # [1, 3, 224, 224]
        return tensor_img, img
    except Exception as e:
        logger.error(f"Error preprocessing image: {str(e)}")
        raise

class MViTVideoClassifier(nn.Module):
    def __init__(self, num_classes=1, dropout=0.4):
        super().__init__()
        try:
            weights = MViT_V2_S_Weights.DEFAULT
            self.backbone = mvit_v2_s(weights=weights)
        except:
            self.backbone = mvit_v2_s()

        features = self.backbone.head[1].in_features
        self.backbone.head = nn.Sequential(
            nn.Linear(features, features // 2),
            nn.LayerNorm(features // 2),
            nn.ReLU(),
            nn.Dropout(dropout),
            nn.Linear(features // 2, num_classes),
            nn.Sigmoid() if num_classes == 1 else nn.Identity()
        )

    def forward(self, x):
        x = x.permute(0, 2, 1, 3, 4)  # Convert to [B, C, T, H, W]
        out = self.backbone(x)
        return out.view(out.size(0))

def load_video_model(model_path: str):
    try:
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found: {model_path}")
        
        model = MViTVideoClassifier()
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        checkpoint = torch.load(model_path, map_location=device)

        # Fix keys if saved with DataParallel
        state_dict = {k.replace("module.", ""): v for k, v in checkpoint.items()}
        model.load_state_dict(state_dict)
        model = model.to(device)
        model.eval()
        logger.info(f"Video model loaded successfully on {device}")
        return model, device
    except Exception as e:
        logger.error(f"Error loading video model: {str(e)}")
        raise

def preprocess_video(file_like, sequence_length=16, dim=224):
    temp_path = None
    try:
        # Read bytes data
        file_like.seek(0)  # Reset file pointer
        bytes_data = file_like.read()
        
        if len(bytes_data) == 0:
            raise ValueError("Empty video data received")

        # Save to temporary file
        with tempfile.NamedTemporaryFile(suffix=".mp4", delete=False) as temp:
            temp.write(bytes_data)
            temp_path = temp.name

        # Open video with OpenCV
        cap = cv2.VideoCapture(temp_path)
        if not cap.isOpened():
            raise ValueError("Could not open video file")
        
        total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        if total == 0:
            cap.release()
            raise ValueError("Video appears to be empty or unreadable")

        # Sample frames evenly
        indices = np.linspace(0, total - 1, sequence_length, dtype=int)

        transform = transforms.Compose([
            transforms.ToPILImage(),
            transforms.Resize((dim, dim)),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ])

        frames = []
        for idx in indices:
            cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
            ret, frame = cap.read()
            if not ret:
                logger.warning(f"Could not read frame at index {idx}")
                continue
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            frames.append(transform(frame))
        
        cap.release()

        if not frames:
            raise ValueError("No valid frames extracted from video")

        # Pad with last frame if needed
        while len(frames) < sequence_length:
            frames.append(frames[-1].clone())

        video_tensor = torch.stack(frames).unsqueeze(0)  # [1, T, C, H, W]
        logger.info(f"Video preprocessed successfully: {video_tensor.shape}")
        return video_tensor
        
    except Exception as e:
        logger.error(f"Error preprocessing video: {str(e)}")
        raise
    finally:
        # Clean up temporary file
        if temp_path and os.path.exists(temp_path):
            try:
                os.unlink(temp_path)
            except Exception as e:
                logger.warning(f"Could not delete temp file {temp_path}: {str(e)}")
