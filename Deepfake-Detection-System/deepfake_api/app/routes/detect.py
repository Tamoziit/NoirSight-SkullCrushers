from fastapi import APIRouter, HTTPException, Body
import requests
import torch
import numpy as np
import cv2
import os
from io import BytesIO
import logging
from app.utils import (
    load_image_model, load_video_model,
    preprocess_image, preprocess_video
)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

# Global variables for models
image_model = None
video_model = None
image_device = None
video_device = None

def initialize_models():
    global image_model, video_model, image_device, video_device
    
    try:
        # Load models once on startup
        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        MODEL_PATH_IMAGE = os.path.normpath(os.path.join(BASE_DIR, "..", "..", "deepfake_model_paths", "best_resnet50.pth"))
        MODEL_PATH_VIDEO = os.path.normpath(os.path.join(BASE_DIR, "..", "..", "deepfake_model_paths", "best_deepfake_model.pth"))

        logger.info(f"Loading image model from: {MODEL_PATH_IMAGE}")
        logger.info(f"Loading video model from: {MODEL_PATH_VIDEO}")
        
        image_model, image_device = load_image_model(MODEL_PATH_IMAGE)
        video_model, video_device = load_video_model(MODEL_PATH_VIDEO)
        
        logger.info("Models loaded successfully")
    except Exception as e:
        logger.error(f"Failed to initialize models: {str(e)}")
        raise

# Initialize models on import
try:
    initialize_models()
except Exception as e:
    logger.error(f"Model initialization failed: {str(e)}")
    # You might want to handle this differently in production

# -------- IMAGE URL ROUTE -------- #
@router.post("/predict/image/url")
async def predict_image_from_url(data: dict = Body(...)):
    try:
        url = data.get("url")
        if not url:
            raise HTTPException(status_code=400, detail="Image URL not provided")

        logger.info(f"Processing image from URL: {url}")
        
        # Check if models are loaded
        if image_model is None:
            raise HTTPException(status_code=500, detail="Image model not loaded")

        # Fetch image
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
        except Exception as e:
            logger.error(f"Failed to fetch image: {str(e)}")
            raise HTTPException(status_code=400, detail=f"Failed to fetch image: {str(e)}")

        # Decode image
        img_array = cv2.imdecode(np.frombuffer(response.content, np.uint8), cv2.IMREAD_COLOR)
        if img_array is None:
            raise HTTPException(status_code=400, detail="Invalid or unreadable image")

        # Preprocess and predict
        tensor, _ = preprocess_image(img_array)
        label, conf = _predict_image(tensor)
        
        logger.info(f"Image prediction: {label} (confidence: {conf})")
        return {"label": label, "confidence": float(conf)}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error in image prediction: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

# -------- VIDEO URL ROUTE -------- #
@router.post("/predict/video/url")
async def predict_video_from_url(data: dict = Body(...)):
    try:
        url = data.get("url")
        if not url:
            raise HTTPException(status_code=400, detail="Video URL not provided")

        logger.info(f"Processing video from URL: {url}")
        
        # Check if models are loaded
        if video_model is None:
            raise HTTPException(status_code=500, detail="Video model not loaded")

        # Fetch video
        try:
            response = requests.get(url, timeout=30)  # Increased timeout for videos
            response.raise_for_status()
        except Exception as e:
            logger.error(f"Failed to fetch video: {str(e)}")
            raise HTTPException(status_code=400, detail=f"Failed to fetch video: {str(e)}")

        # Process video
        try:
            video_stream = BytesIO(response.content)
            tensor = preprocess_video(video_stream)
            label, conf = _predict_video(tensor)
            
            logger.info(f"Video prediction: {label} (confidence: {conf})")
            return {"label": label, "confidence": float(conf)}
            
        except Exception as e:
            logger.error(f"Video processing failed: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Video processing failed: {str(e)}")
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error in video prediction: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

# -------- HELPER PREDICTION FUNCTIONS -------- #
def _predict_image(tensor):
    try:
        tensor = tensor.to(image_device)
        with torch.no_grad():
            out = image_model(tensor)
        val = out.item()
        return ("real" if val <= 0.5 else "fake"), val
    except Exception as e:
        logger.error(f"Error in image prediction: {str(e)}")
        raise

def _predict_video(tensor):
    try:
        tensor = tensor.to(video_device)
        with torch.no_grad():
            out = video_model(tensor)
        val = out.item()
        return ("fake" if val > 0.59 else "real"), val
    except Exception as e:
        logger.error(f"Error in video prediction: {str(e)}")
        raise

# Health check endpoint
@router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "image_model_loaded": image_model is not None,
        "video_model_loaded": video_model is not None
    }
