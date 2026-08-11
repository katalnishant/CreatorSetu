from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from extensions import db
from models.CreatorProfile import CreatorProfile
from models.User import User
from models.Rating import Rating

ratings_bp = Blueprint("ratings", __name__)


def _resolve_creator_profile(creator_identifier):
    """Resolve a creator profile from either a creator profile ID or a user ID."""
    profile = CreatorProfile.query.filter_by(id=creator_identifier).first()
    if profile:
        return profile

    user = User.query.get(creator_identifier)
    if user:
        return user.creator_profile

    return None


@ratings_bp.route("", methods=["POST"])
@jwt_required()
def submit_rating():
    data = request.get_json(silent=True) or {}
    creator_id = data.get("creator_id")
    reviewer_name = (data.get("reviewer_name") or "").strip()
    rating = data.get("rating")
    review = (data.get("review") or "").strip()

    if not creator_id:
        return jsonify({"success": False, "message": "Creator ID is required"}), 400

    creator_profile = _resolve_creator_profile(creator_id)
    if not creator_profile:
        return jsonify({"success": False, "message": "Creator not found"}), 404

    try:
        rating_value = int(rating)
    except (TypeError, ValueError):
        return jsonify({"success": False, "message": "Rating must be a number between 1 and 5"}), 400

    if not 1 <= rating_value <= 5:
        return jsonify({"success": False, "message": "Rating must be between 1 and 5"}), 400

    if not reviewer_name:
        return jsonify({"success": False, "message": "Reviewer name is required"}), 400

    new_rating = Rating(
        creator_id=creator_profile.user_id,
        reviewer_name=reviewer_name,
        rating=rating_value,
        review=review or None,
    )

    try:
        db.session.add(new_rating)
        db.session.commit()
    except Exception:
        db.session.rollback()
        return jsonify({"success": False, "message": "Failed to save review"}), 500

    return jsonify({"success": True, "message": "Review submitted successfully", "rating": new_rating.to_dict()}), 201


@ratings_bp.route("/<int:creator_id>", methods=["GET"])
def get_ratings(creator_id):
    creator_profile = _resolve_creator_profile(creator_id)
    if not creator_profile:
        return jsonify({"success": False, "message": "Creator not found"}), 404

    # Fetch ratings for the creator's linked user record so reviews remain consistent.
    ratings = Rating.query.filter_by(creator_id=creator_profile.user_id).order_by(Rating.created_at.desc()).all()
    total_reviews = len(ratings)
    average_rating = round(sum(rating.rating for rating in ratings) / total_reviews, 1) if total_reviews else 0

    return jsonify({
        "success": True,
        "creator_id": creator_profile.user_id,
        "average_rating": average_rating,
        "total_reviews": total_reviews,
        "ratings": [rating.to_dict() for rating in ratings],
    }), 200
