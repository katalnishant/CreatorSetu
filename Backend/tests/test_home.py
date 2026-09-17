def test_home_returns_running_message(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.get_json()["message"] == "CreatorSetu Backend Running \U0001f680"
