from app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_predict_happy_path():
    payload = {
        "location_grouped": "Thane",
        "carpet_area_sqft": 850.0,
        "floor_num": 5,
        "Bathroom": 2,
        "Balcony": 1,
        "Furnishing": "Semi-Furnished",
        "Transaction": "Resale",
        "Ownership": "Freehold",
        "facing": "East",
    }
    response = client.post("/predict", json=payload)
    assert response.status_code == 200
    assert "predicted_price" in response.json()


def test_predict_invalid_input():
    payload = {"carpet_area_sqft": 850.0}
    response = client.post("/predict", json=payload)
    assert response.status_code == 422