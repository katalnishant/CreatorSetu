import os
import sys

import pytest

# Make Backend/ importable when pytest is run from the repo root
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))


@pytest.fixture(scope="session")
def flask_app():
    """
    Imports the real Flask app once per test session.

    app.py runs db.create_all() at import time, so a reachable MySQL database
    is required (DB_HOST / DB_PORT / DB_USER / DB_PASSWORD / DB_NAME env vars):
      - In CI: provided automatically by the mysql service container (see
        .github/workflows/ci-cd.yml).
      - Locally: run `docker-compose up -d mysql` first, or point these env
        vars at any MySQL instance you have running, then `pytest` from
        inside Backend/.
    """
    from app import app as flask_app

    flask_app.config.update(TESTING=True)
    yield flask_app


@pytest.fixture()
def client(flask_app):
    return flask_app.test_client()
