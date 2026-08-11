import os

import cloudinary
import cloudinary.uploader


def configure_cloudinary():
    """Load Cloudinary configuration from environment variables."""
    cloudinary.config(
        cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
        api_key=os.getenv("CLOUDINARY_API_KEY"),
        api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    )


def upload_image(file_storage, folder="creator-setu/profiles"):
    """Upload an image to Cloudinary and return the secure URL."""
    configure_cloudinary()

    if not os.getenv("CLOUDINARY_CLOUD_NAME") or not os.getenv("CLOUDINARY_API_KEY") or not os.getenv("CLOUDINARY_API_SECRET"):
        raise ValueError("Cloudinary credentials are not configured")

    result = cloudinary.uploader.upload(
        file_storage,
        folder=folder,
        resource_type="image",
    )

    return result.get("secure_url")
