from flask import Blueprint, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required

from extensions import db
from models.Notification import Notification

notifications_bp = Blueprint("notifications", __name__)


@notifications_bp.route("", methods=["GET"])
@jwt_required()
def get_notifications():
    current_user_id = get_jwt_identity()
    notifications = Notification.query.filter_by(user_id=current_user_id).order_by(Notification.created_at.desc()).all()

    return jsonify({
        "success": True,
        "notifications": [notification.to_dict() for notification in notifications],
    }), 200


@notifications_bp.route("/<int:notification_id>/read", methods=["PATCH"])
@jwt_required()
def mark_notification_read(notification_id):
    current_user_id = get_jwt_identity()
    notification = Notification.query.filter_by(id=notification_id, user_id=current_user_id).first()

    if not notification:
        return jsonify({"success": False, "message": "Notification not found"}), 404

    notification.is_read = True
    try:
        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({"success": False, "message": "Failed to update notification"}), 500

    return jsonify({"success": True, "message": "Notification marked as read"}), 200


@notifications_bp.route("/read-all", methods=["PATCH"])
@jwt_required()
def mark_all_notifications_read():
    current_user_id = get_jwt_identity()
    notifications = Notification.query.filter_by(user_id=current_user_id, is_read=False).all()

    for notification in notifications:
        notification.is_read = True

    try:
        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({"success": False, "message": "Failed to update notifications"}), 500

    return jsonify({"success": True, "message": "All notifications marked as read"}), 200
