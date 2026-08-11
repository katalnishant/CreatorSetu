import os
from routes.upload import upload_bp

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
from extensions import db
from routes.auth import auth_bp
from routes.collaboration import collaboration_bp
from routes.creator import creator_bp
from routes.creators import creators_bp
from routes.notifications import notifications_bp
from routes.ratings import ratings_bp
from routes.user import user_bp

app = Flask(__name__)
app.config.from_object(Config)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "dev-secret-key")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 86400

CORS(app)
db.init_app(app)
JWTManager(app)

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(user_bp, url_prefix="/api/user")
app.register_blueprint(creator_bp, url_prefix="/api/creator")
app.register_blueprint(creators_bp, url_prefix="/api/creators")
app.register_blueprint(collaboration_bp, url_prefix="/api/collaboration")
app.register_blueprint(notifications_bp, url_prefix="/api/notifications")
app.register_blueprint(ratings_bp, url_prefix="/api/ratings")
app.register_blueprint(upload_bp, url_prefix="/api/upload")

from models.Collaboration import Collaboration
from models.CreatorProfile import CreatorProfile
from models.Notification import Notification
from models.Rating import Rating
from models.User import User


@app.route("/")
def home():
    return {
        "message": "CreatorSetu Backend Running 🚀"
    }


with app.app_context():
    db.create_all()

    print("\n===== REGISTERED ROUTES =====")
for rule in app.url_map.iter_rules():
    print(rule)
print("=============================\n")


if __name__ == "__main__":
    app.run(debug=True)