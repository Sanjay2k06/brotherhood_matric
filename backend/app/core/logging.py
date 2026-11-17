import logging
import sys

# Configure structured production-ready logger
def setup_logging():
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
        handlers=[
            logging.StreamHandler(sys.stdout)
        ]
    )
    
    # Disable duplicate logs from standard uvicorn loggers if wanted
    uvicorn_error = logging.getLogger("uvicorn.error")
    uvicorn_access = logging.getLogger("uvicorn.access")
    
    uvicorn_error.setLevel(logging.INFO)
    uvicorn_access.setLevel(logging.INFO)

logger = logging.getLogger("school_cms")
