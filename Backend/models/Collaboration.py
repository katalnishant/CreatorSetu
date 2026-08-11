from datetime import datetime

from extensions import db


class Collaboration(db.Model):
    __tablename__ = "collaborations"

    id = db.Column(db.Integer, primary_key=True)
    brand_name = db.Column(db.String(120), nullable=False)
    brand_email = db.Column(db.String(255), nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    campaign_title = db.Column(db.String(200), nullable=False)
    campaign_description = db.Column(db.Text, nullable=False)
    budget = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), nullable=False, default="Pending")
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    creator = db.relationship("User", backref=db.backref("collaboration_requests", cascade="all, delete-orphan"))

    def to_dict(self):
        return {
            "id": self.id,
            "brand_name": self.brand_name,
            "brand_email": self.brand_email,
            "creator_id": self.creator_id,
            "campaign_title": self.campaign_title,
            "campaign_description": self.campaign_description,
            "budget": self.budget,
            "status": self.status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
