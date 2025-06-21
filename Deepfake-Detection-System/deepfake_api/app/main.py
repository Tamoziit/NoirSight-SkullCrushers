from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import detect
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Deepfake Detection API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(detect.router, prefix="/api", tags=["detection"])

@app.get("/")
async def root():
    return {"message": "Deepfake Detection API is running"}

@app.on_event("startup")
async def startup_event():
    logger.info("Starting up Deepfake Detection API...")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down Deepfake Detection API...")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
