# Real Estate Price Prediction App

An end-to-end machine learning web application for real estate valuation. This repository includes data processing pipelines, exploratory data analysis (EDA), model training & evaluation, a FastAPI backend service, and a React + Vite frontend interface. 

The project is designed to be fully reproducible, with a clean git history and secure environment variable management.

---

## Features & Deliverables

### 1. Data Science & Machine Learning (`notebooks/house_price_model.ipynb`)
- **Reproducibility**: The notebook runs top-to-bottom without errors (Kernel → Restart & Run All).
- **Data Cleaning & Feature Engineering**: Includes price and area parsing, outlier handling (justified decisions), and high-cardinality categorical encoding.
- **Exploratory Data Analysis (EDA)**: Contains 4 or more meaningful plots with written interpretations.
- **Modeling & Evaluation**: 
  - Proper Train/Test split implemented.
  - Compares at least 2 models.
  - Evaluation metrics (MAE, RMSE, R²) are strictly reported on the **test set** to prevent data leakage.
  - Exports the best pipeline-based model to `models/house_price.pkl` (served by the backend).

### 2. Backend (`backend/`)
- **Framework**: FastAPI application with CORS configured.
- **Endpoints**: Provides `/health` for startup loading checks and `/predict` for pipeline-based inference.
- **Testing**: Includes passing tests using `pytest`.
- **Dependencies**: Pinned versions in `requirements.txt`.
- **Environment**: Includes `.env.example` for secure local setup.

### 3. Frontend (`frontend/`)
- **Framework**: React + Vite application.
- **Features**: Working form with state management, input validation, loading states, error handling, and clean result display.
- **Configuration**: Uses `.env` variables for API routing (avoiding hard-coded `localhost` URLs).
- **Build**: Passes `npm run build` successfully.

---

## Project Structure

```text
.
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   │   └── house_price.pkl
│   │   ├── schemas/
│   │   └── services/
│   ├── .env.example
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   └── App.tsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.ts
├── notebooks/
│   └── house_price_model.ipynb
├── .gitignore
└── README.md
```

---

## How to Run Locally

Follow these steps to set up and run the full application on your local machine.

### Prerequisites

* Python 3.9+
* Node.js 20+ and npm

### Backend Setup (FastAPI)

1. Navigate to the `backend` directory:
```bash
cd backend
```


2. Create and activate a virtual environment:
```bash
# Windows
python -m venv .venv
.venv\Scripts\activate

# macOS/Linux
python -m venv .venv
source .venv/bin/activate
```


3. Install dependencies:
```bash
pip install -r requirements.txt
```


4. Configure environment variables:
```bash
cp .env.example .env
```


5. Run the backend server:
```bash
uvicorn main:app --reload --port 8000
```


* API is live at: `http://localhost:8000`
* Health check: `http://localhost:8000/health`
* Swagger UI: `http://localhost:8000/docs`



### Frontend Setup (React + Vite)

1. Open a **new terminal** and navigate to the `frontend` directory:
```bash
cd frontend
```


2. Install Node modules:
```bash
npm install
```


3. Configure environment variables:
```bash
cp .env.example .env
```


*(Ensure your `.env` contains: `VITE_API_BASE_URL=http://localhost:8000`)*
4. Start the development server:
```bash
npm run dev
```


* The UI is live at: `http://localhost:5173`



### Running Tests & Building

**Backend Tests:**
Open a terminal in the `backend` directory (with the virtual environment activated) and run:

```bash
pytest
```

**Frontend Build Check:**
Open a terminal in the `frontend` directory and run:

```bash
npm run build
```
