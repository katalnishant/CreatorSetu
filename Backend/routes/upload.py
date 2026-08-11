from flask import Blueprint, request, jsonify

from services.cloudinary_service import upload_image

print("✅ upload.py loaded")

upload_bp = Blueprint("upload", __name__)


@upload_bp.route("/", methods=["POST"])
def upload():

    if "image" not in request.files:
        return jsonify({
            "success": False,
            "message": "No image uploaded"
        }), 400

    image = request.files["image"]

    if image.filename == "":
        return jsonify({
            "success": False,
            "message": "Please select an image"
        }), 400

    try:
        image_url = upload_image(image)

        return jsonify({
            "success": True,
            "url": image_url
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500