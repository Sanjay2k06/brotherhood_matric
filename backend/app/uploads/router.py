from fastapi import APIRouter, File, UploadFile, Depends
from app.core.dependencies import require_editor_or_above
from app.uploads.services import UploadService

router = APIRouter()

@router.post("/upload/")
async def upload_media(
    file: UploadFile = File(...),
    current_user = Depends(require_editor_or_above)
):
    url = UploadService.upload_file(file)
    return {"url": url}
