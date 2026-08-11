from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from extensions import db
from models.Collaboration import Collaboration
from models.Notification import Notification
from models.User import User

collaboration_bp = Blueprint("collaboration", __name__)


def _validate_payload(data):
    errors = []

    if not str(data.get("brand_name", "")).strip():
        errors.append("brand_name is required")
    if not str(data.get("brand_email", "")).strip():
        errors.append("brand_email is required")
    if not str(data.get("campaign_title", "")).strip():
        errors.append("campaign_title is required")
    if not str(data.get("campaign_description", "")).strip():
        errors.append("campaign_description is required")
    if not str(data.get("budget", "")).strip():
        errors.append("budget is required")

    email = str(data.get("brand_email", "")).strip()
    if email and ("@" not in email or "." not in email):
        errors.append("brand_email must be a valid email")

    return errors


@collaboration_bp.route("/send", methods=["POST"])
@jwt_required()
def send_request():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"success": False, "message": "User not found"}), 404

    data = request.get_json(silent=True) or {}
    validation_errors = _validate_payload(data)
    if validation_errors:
        return jsonify({"success": False, "message": "Validation failed", "errors": validation_errors}), 400

    creator_id = data.get("creator_id")
    if not creator_id:
        return jsonify({"success": False, "message": "creator_id is required"}), 400

    creator = User.query.get(creator_id)
    if not creator:
        return jsonify({"success": False, "message": "Creator not found"}), 404

    request_entry = Collaboration(
        brand_name=str(data.get("brand_name", "")).strip(),
        brand_email=str(data.get("brand_email", "")).strip(),
        creator_id=creator.id,
        campaign_title=str(data.get("campaign_title", "")).strip(),
        campaign_description=str(data.get("campaign_description", "")).strip(),
        budget=str(data.get("budget", "")).strip(),
        status="Pending",
    )

    try:
        db.session.add(request_entry)
        notification = Notification(
            user_id=creator.id,
            title="New collaboration request",
            message=f"{user.name} wants to collaborate on {request_entry.campaign_title}",
            is_read=False,
        )
        db.session.add(notification)
        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({"success": False, "message": "Failed to send collaboration request"}), 500

    return jsonify({
        "success": True,
        "message": "Collaboration request sent successfully",
        "request": request_entry.to_dict(),
    }), 201


@collaboration_bp.route("/my-requests", methods=["GET"])
@jwt_required()
def my_requests():
    current_user_id = get_jwt_identity()
    requests = Collaboration.query.filter_by(creator_id=current_user_id).order_by(Collaboration.created_at.desc()).all()

    return jsonify({
        "success": True,
        "requests": [request.to_dict() for request in requests],
    }), 200


@collaboration_bp.route("/<int:request_id>/accept", methods=["PATCH"])
@jwt_required()
def accept_request(request_id):
    current_user_id = get_jwt_identity()
    request_entry = Collaboration.query.filter_by(id=request_id, creator_id=current_user_id).first()

    if not request_entry:
        return jsonify({"success": False, "message": "Request not found"}), 404

    request_entry.status = "Accepted"
    try:
        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({"success": False, "message": "Failed to accept request"}), 500

    return jsonify({
        "success": True,
        "message": "Request accepted",
        "request": request_entry.to_dict(),
    }), 200


@collaboration_bp.route("/<int:request_id>/reject", methods=["PATCH"])
@jwt_required()
def reject_request(request_id):
    current_user_id = get_jwt_identity()
    request_entry = Collaboration.query.filter_by(id=request_id, creator_id=current_user_id).first()

    if not request_entry:
        return jsonify({"success": False, "message": "Request not found"}), 404

    request_entry.status = "Rejected"
    try:
        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({"success": False, "message": "Failed to reject request"}), 500

    return jsonify({
        "success": True,
        "message": "Request rejected",
        "request": request_entry.to_dict(),
    }), 200
