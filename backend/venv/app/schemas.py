from pydantic import BaseModel
from typing import List, Optional
from datetime import date

# Pydantic Schemas
class StationBase(BaseModel):
    societe: Optional[str] = None
    type_station: Optional[str] = None
    adresse: Optional[str] = None
    province_prefecture: Optional[str] = None
    urbain: Optional[bool] = None
    date_creation: Optional[date] = None
    region: Optional[str] = None
    gerant: Optional[str] = None
    etat_station: Optional[str] = None
    type_gerance: Optional[str] = None
    capacite: Optional[int] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class StationResponse(StationBase):
    id: int
    
    class Config:
        from_attributes = True

class AnalyticsResponse(BaseModel):
    total_stations: int
    stations_actives: int
    stations_arret: int
    by_province: dict
    by_societe: dict
    by_type: dict
