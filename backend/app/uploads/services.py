import os
import shutil
import uuid
from fastapi import UploadFile
import cloudinary
import cloudinary.uploader
from app.core.config import settings
from app.core.logging import logger

if settings.CLOUDINARY_CLOUD_NAME and settings.CLOUDINARY_API_KEY and settings.CLOUDINARY_API_SECRET:
    cloudinary.config(
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        api_key=settings.CLOUDINARY_API_KEY,
        api_secret=settings.CLOUDINARY_API_SECRET,
        secure=True
    )
    CLOUDINARY_ENABLED = True
    logger.info("Cloudinary storage service initialized successfully.")
else:
    CLOUDINARY_ENABLED = False
    logger.info("Cloudinary credentials missing. Defaulting to local storage upload service.")

class UploadService:
    @staticmethod
    def upload_file(file: UploadFile) -> str:
        if CLOUDINARY_ENABLED:
            try:
                result = cloudinary.uploader.upload(
                    file.file,
                    folder="school_cms",
                    resource_type="auto"
                )
                logger.info(f"File '{file.filename}' uploaded to Cloudinary successfully.")
                return result.get("secure_url")
            except Exception as e:
                logger.error(f"Cloudinary upload failed: {str(e)}. Falling back to local storage.")

        upload_dir = os.path.join(os.getcwd(), "uploads")
        os.makedirs(upload_dir, exist_ok=True)

        ext = os.path.splitext(file.filename)[1]
        unique_name = f"{uuid.uuid4()}{ext}"
        dest_path = os.path.join(upload_dir, unique_name)

        try:
            with open(dest_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            
            logger.info(f"File '{file.filename}' saved locally as '{unique_name}'.")
            return f"http://127.0.0.1:8000/uploads/{unique_name}"
        except Exception as err:
            logger.error(f"Failed to save upload locally: {str(err)}")
            raise err
