from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services.inference import predict_price
from app.services.preprocessing import prepare_input_dataframe
from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
def health_check():
    return {"status": "ok"}


@router.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    df = prepare_input_dataframe(request)
    price = predict_price(df)
    return {"predicted_price": price}