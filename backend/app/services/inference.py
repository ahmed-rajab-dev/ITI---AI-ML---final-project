import joblib
import numpy as np
import pandas as pd

MODEL_PATH = "app/models/house_price.pkl"
model = None


def load_model():
    global model
    model = joblib.load(MODEL_PATH)


def predict_price(df: pd.DataFrame) -> float:
    log_pred = model.predict(df)[0]
    actual_pred = float(np.expm1(log_pred))
    return round(actual_pred, 2)