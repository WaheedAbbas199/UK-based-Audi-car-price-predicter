from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib

# Load model
model = joblib.load("model_pipeline.pkl")

app = FastAPI(title="Audi Car Prediction API")

# ✅ CORS MIDDLEWARE (VERY IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # production mein specific domain
    allow_credentials=True,
    allow_methods=["*"],   # OPTIONS allow ho jayega
    allow_headers=["*"],
)

class CarInput(BaseModel):
    model: str
    year: int
    transmission: str
    mileage: int
    fuelType: str
    tax: int
    mpg: float
    engineSize: float

@app.post("/predict")
def predict_price(data: CarInput):
    input_df = pd.DataFrame([data.dict()])
    prediction = model.predict(input_df)

    return {
        "predicted_price": round(float(prediction[0]), 2)
    }
