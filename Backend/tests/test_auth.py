import pytest

from extensions import db
from models.User import User

TEST_EMAIL = "pytest-user@example.com"
TEST_PASSWORD = "Test@1234"


@pytest.fixture(autouse=True)
def clean_test_user(flask_app):
    """Delete the test user before and after each test so the suite is repeatable."""
    with flask_app.app_context():
        User.query.filter_by(email=TEST_EMAIL).delete()
        db.session.commit()
    yield
    with flask_app.app_context():
        User.query.filter_by(email=TEST_EMAIL).delete()
        db.session.commit()


def _register(client, email=TEST_EMAIL, password=TEST_PASSWORD, name="Pytest User"):
    return client.post(
        "/api/auth/register",
        json={"name": name, "email": email, "password": password},
    )


def test_register_creates_user(client):
    response = _register(client)
    assert response.status_code == 201

    body = response.get_json()
    assert body["success"] is True
    assert body["user"]["email"] == TEST_EMAIL


def test_register_missing_fields_returns_400(client):
    response = client.post("/api/auth/register", json={"email": "x@example.com"})
    assert response.status_code == 400


def test_register_duplicate_email_returns_409(client):
    _register(client)
    response = _register(client)
    assert response.status_code == 409


def test_login_with_correct_credentials_returns_token(client):
    _register(client)

    response = client.post(
        "/api/auth/login",
        json={"email": TEST_EMAIL, "password": TEST_PASSWORD},
    )

    assert response.status_code == 200
    assert "token" in response.get_json()


def test_login_with_wrong_password_returns_401(client):
    _register(client)

    response = client.post(
        "/api/auth/login",
        json={"email": TEST_EMAIL, "password": "wrong-password"},
    )

    assert response.status_code == 401
