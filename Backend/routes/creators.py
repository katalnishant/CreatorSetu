from flask import Blueprint, jsonify

from models.CreatorProfile import CreatorProfile
from models.User import User

creators_bp = Blueprint("creators", __name__)


@creators_bp.route("", methods=["GET"])
def list_creators():
    try:
        profiles = CreatorProfile.query.all()
    except Exception:
        return jsonify({
            "success": False,
            "message": "Failed to fetch creators"
        }), 500

    creators = []
    for profile in profiles:
        user = User.query.get(profile.user_id)
        creators.append({
            "id": profile.id,
            "creator_name": user.name if user else "Unknown Creator",
            "bio": profile.bio,
            "category": profile.category,
            "followers": profile.followers,
            "pricing": profile.pricing,
            "instagram": profile.instagram,
            "youtube": profile.youtube,
            "linkedin": profile.linkedin,
        })

    return jsonify({
        "success": True,
        "creators": creators
    }), 200
