from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from datetime import datetime
import os

MONGODB_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME")
client = AsyncIOMotorClient(MONGODB_URI)
db = client[DB_NAME]
company_collection = db["companies"]

class APIKeyAuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        user_id = request.headers.get("x-user-id")
        api_key = request.headers.get("x-api-key")

        if not user_id or not api_key:
            return JSONResponse(status_code=401, content={"error": "Missing authentication headers"})

        try:
            company = await company_collection.find_one({"_id": ObjectId(user_id)})
            if not company:
                return JSONResponse(status_code=404, content={"error": "User not found"})

            now = datetime.utcnow()
            valid_project = next(
                (
                    p for p in company.get("projects", [])
                    if p["apiKey"] == api_key and isinstance(p["validity"], datetime) and p["validity"] > now
                ),
                None
            )

            if not valid_project:
                return JSONResponse(status_code=403, content={"error": "Invalid or expired API key"})

            request.state.project = valid_project
            request.state.company = company

            return await call_next(request)

        except Exception as e:
            # Optional: log this error using logger
            return JSONResponse(status_code=500, content={"error": f"Internal server error: {str(e)}"})
