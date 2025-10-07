from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import stations, analytics, exports

# FastAPI App
app = FastAPI(
    title="Smart Stations API",
    description="API pour le dashboard des stations-service",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
@app.get("/")
def read_root():
    return {"message": "Smart Stations API v1.0", "status": "active"}

# Include routers
app.include_router(stations.router, prefix="/api/stations", tags=["stations"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])
app.include_router(exports.router, prefix="/api/exports", tags=["exports"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)