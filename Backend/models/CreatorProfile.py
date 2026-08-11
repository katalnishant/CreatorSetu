from extensions import db


class CreatorProfile(db.Model):
    __tablename__ = "creator_profiles"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, unique=True)
    profile_image = db.Column(db.String(255), nullable=True)
    bio = db.Column(db.Text, nullable=True)
    category = db.Column(db.String(100), nullable=True)
    instagram = db.Column(db.String(255), nullable=True)
    youtube = db.Column(db.String(255), nullable=True)
    linkedin = db.Column(db.String(255), nullable=True)
    followers = db.Column(db.Integer, nullable=True)
    pricing = db.Column(db.String(100), nullable=True)
    skills = db.Column(db.Text, nullable=True)

    user = db.relationship("User", backref=db.backref("creator_profile", uselist=False, cascade="all, delete-orphan"))

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "profile_image": self.profile_image,
            "bio": self.bio,
            "category": self.category,
            "instagram": self.instagram,
            "youtube": self.youtube,
            "linkedin": self.linkedin,
            "followers": self.followers,
            "pricing": self.pricing,
            "skills": self.skills,
        }
