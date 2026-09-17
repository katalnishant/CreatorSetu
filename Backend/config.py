import os
from urllib.parse import quote_plus

from dotenv import load_dotenv

# No hardcoded path — looks for a .env file in the current working directory.
# Locally: put a .env in Backend/ (see .env.example).
# In Docker/CI: real env vars are injected directly, so this call is a harmless no-op.
load_dotenv()


class Config:
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_PORT = os.getenv("DB_PORT", "3306")
    DB_NAME = os.getenv("DB_NAME", "creatorsetu")
    DB_USER = os.getenv("DB_USER", "root")
    DB_PASSWORD = os.getenv("DB_PASSWORD")

    if not DB_PASSWORD:
        raise RuntimeError(
            "DB_PASSWORD is not set. Create Backend/.env from .env.example "
            "(local dev) or set it in your environment / docker-compose / CI secrets."
        )

    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{quote_plus(DB_USER)}:{quote_plus(DB_PASSWORD)}"
        f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
