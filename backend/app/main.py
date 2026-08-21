from contextlib import asynccontextmanager
from app.api.routes.prediction import router as api_router
from app.services.inference import load_model
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load model on startup
    load_model()
    yield


app = FastAPI(title="House Price Prediction API", lifespan=lifespan)

# إضافة CORS للسماح بالاتصال من Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React / Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)