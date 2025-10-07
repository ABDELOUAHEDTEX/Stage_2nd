from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app.models import Station, SessionLocal
from app.schemas import StationResponse

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter()

@router.get("/", response_model=List[StationResponse])
def get_stations(
    province: Optional[str] = None,
    societe: Optional[str] = None,
    etat: Optional[str] = None,
    type_station: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Récupère les stations avec filtres optionnels"""
    query = db.query(Station)
    
    if province:
        query = query.filter(Station.province_prefecture == province)
    if societe:
        query = query.filter(Station.societe == societe)
    if etat:
        query = query.filter(Station.etat_station == etat)
    if type_station:
        query = query.filter(Station.type_station == type_station)
    
    stations = query.offset(skip).limit(limit).all()
    return stations

@router.get("/{station_id}", response_model=StationResponse)
def get_station(station_id: int, db: Session = Depends(get_db)):
    """Récupère une station par ID"""
    station = db.query(Station).filter(Station.id == station_id).first()
    if not station:
        raise HTTPException(status_code=404, detail="Station non trouvée")
    return station
