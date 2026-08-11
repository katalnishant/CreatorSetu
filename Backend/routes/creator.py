from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from extensions import db
from models.CreatorProfile import CreatorProfile
from models.User import User
from services.cloudinary_service import upload_image

creator_bp = Blueprint("creator", __name__)


def _validate_profile_data(data):
    errors = []

    if not data.get("bio") or not str(data.get("bio", "")).strip():
        errors.append("bio is required")

    if not data.get("category") or not str(data.get("category", "")).strip():
        errors.append("category is required")

    if data.get("followers") is not None:
        try:
            followers_value = int(data.get("followers"))
            if followers_value < 0:
                errors.append("followers cannot be negative")
        except (TypeError, ValueError):
            errors.append("followers must be an integer")

    if data.get("pricing") is not None and not str(data.get("pricing", "")).strip():
        errors.append("pricing cannot be empty")

    if data.get("skills") is not None and not str(data.get("skills", "")).strip():
        errors.append("skills cannot be empty")

    return errors


@creator_bp.route("/profile", methods=["POST"])
@jwt_required()
def create_profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404

    existing_profile = CreatorProfile.query.filter_by(user_id=user.id).first()
    if existing_profile:
        return jsonify({"success": False, "message": "Profile already exists"}), 409

    data = request.form.to_dict() if request.form else (request.get_json(silent=True) or {})
    validation_errors = _validate_profile_data(data)
    if validation_errors:
        return jsonify({"success": False, "message": "Validation failed", "errors": validation_errors}), 400

    profile_image_url = None
    if 'profile_image' in request.files:
        uploaded_file = request.files['profile_image']
        if uploaded_file.filename:
            try:
                profile_image_url = upload_image(uploaded_file.stream)
            except Exception as exc:
                return jsonify({"success": False, "message": f"Image upload failed: {str(exc)}"}), 500

    profile = CreatorProfile(
        user_id=user.id,
        profile_image=profile_image_url or (data.get("profile_image") or "").strip() or None,
        bio=(data.get("bio") or "").strip(),
        category=(data.get("category") or "").strip(),
        instagram=(data.get("instagram") or "").strip() or None,
        youtube=(data.get("youtube") or "").strip() or None,
        linkedin=(data.get("linkedin") or "").strip() or None,
        followers=int(data.get("followers")) if data.get("followers") is not None else None,
        pricing=(data.get("pricing") or "").strip() or None,
        skills=(data.get("skills") or "").strip() or None,
    )

    try:
        db.session.add(profile)
        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({"success": False, "message": "Failed to create profile"}), 500

    return jsonify({"success": True, "message": "Profile created successfully", "profile": profile.to_dict()}), 201


@creator_bp.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    current_user_id = get_jwt_identity()
    profile = CreatorProfile.query.filter_by(user_id=current_user_id).first()

    if not profile:
        return jsonify({"success": False, "message": "Profile not found"}), 404

    return jsonify({"success": True, "message": "Profile fetched successfully", "profile": profile.to_dict()}), 200


@creator_bp.route("/profile", methods=["PUT"])
@jwt_required()
def update_profile():
    current_user_id = get_jwt_identity()
    profile = CreatorProfile.query.filter_by(user_id=current_user_id).first()

    if not profile:
        return jsonify({"success": False, "message": "Profile not found"}), 404

    data = request.form.to_dict() if request.form else (request.get_json(silent=True) or {})
    validation_errors = _validate_profile_data(data)
    if validation_errors:
        return jsonify({"success": False, "message": "Validation failed", "errors": validation_errors}), 400

    profile_image_url = None
    if 'profile_image' in request.files:
        uploaded_file = request.files['profile_image']
        if uploaded_file.filename:
            try:
                profile_image_url = upload_image(uploaded_file.stream)
            except Exception as exc:
                return jsonify({"success": False, "message": f"Image upload failed: {str(exc)}"}), 500

    profile.profile_image = profile_image_url or (data.get("profile_image") or "").strip() or None
    profile.bio = (data.get("bio") or "").strip()
    profile.category = (data.get("category") or "").strip()
    profile.instagram = (data.get("instagram") or "").strip() or None
    profile.youtube = (data.get("youtube") or "").strip() or None
    profile.linkedin = (data.get("linkedin") or "").strip() or None
    profile.followers = int(data.get("followers")) if data.get("followers") is not None else None
    profile.pricing = (data.get("pricing") or "").strip() or None
    profile.skills = (data.get("skills") or "").strip() or None

    try:
        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({"success": False, "message": "Failed to update profile"}), 500

    return jsonify({"success": True, "message": "Profile updated successfully", "profile": profile.to_dict()}), 200


@creator_bp.route("/profile", methods=["DELETE"])
@jwt_required()
def delete_profile():
    current_user_id = get_jwt_identity()
    profile = CreatorProfile.query.filter_by(user_id=current_user_id).first()

    if not profile:
        return jsonify({"success": False, "message": "Profile not found"}), 404

    try:
        db.session.delete(profile)
        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({"success": False, "message": "Failed to delete profile"}), 500

    return jsonify({"success": True, "message": "Profile deleted successfully"}), 200
