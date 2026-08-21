import json
import pandas as pd
from app.schemas.prediction import PredictionRequest

try:
    with open('app/models/locations.json', 'r') as f:
            ALLOWED_LOCATIONS = set(json.load(f))
except FileNotFoundError:
    ALLOWED_LOCATIONS = set()

def prepare_input_dataframe(request: PredictionRequest) -> pd.DataFrame:
    try:
        data = request.model_dump()
    except AttributeError:
        data = request.dict()
        
    df = pd.DataFrame([data])
    return df