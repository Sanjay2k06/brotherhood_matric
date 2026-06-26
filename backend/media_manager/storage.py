import os
import uuid
from django.conf import settings
from django.core.files.storage import FileSystemStorage

try:
    import cloudinary
    import cloudinary.uploader
    CLOUDINARY_AVAILABLE = True
except ImportError:
    CLOUDINARY_AVAILABLE = False

def upload_file_to_storage(file_obj, folder="school_uploads"):
    """
    Uploads a file to Cloudinary if credentials exist,
    otherwise falls back to Django local filesystem media storage.
    """
    is_cloudinary_configured = (
        hasattr(settings, "CLOUDINARY_STORAGE") and 
        settings.CLOUDINARY_STORAGE.get("CLOUD_NAME")
    )
    
    if CLOUDINARY_AVAILABLE and is_cloudinary_configured:
        try:
            # resource_type='auto' supports images, raw files, pdfs, docs, etc.
            upload_result = cloudinary.uploader.upload(
                file_obj,
                folder=folder,
                resource_type="auto"
            )
            return upload_result.get("secure_url")
        except Exception as e:
            # Print error or log it, and fall back to local disk
            print(f"Cloudinary upload failed: {e}. Falling back to local storage.")
            
    # Local File System Fallback
    folder_path = os.path.join(settings.MEDIA_ROOT, folder)
    if not os.path.exists(folder_path):
        os.makedirs(folder_path, exist_ok=True)
        
    fs = FileSystemStorage(location=folder_path, base_url=f"{settings.MEDIA_URL}{folder}/")
    unique_name = f"{uuid.uuid4().hex}_{file_obj.name.replace(' ', '_')}"
    saved_name = fs.save(unique_name, file_obj)
    
    # Return full absolute url for simple frontend integration
    request_host = os.getenv("ALLOWED_HOSTS", "localhost:8000").split(",")[0]
    # Local fallback URL construction
    return f"http://{request_host}{fs.url(saved_name)}"
