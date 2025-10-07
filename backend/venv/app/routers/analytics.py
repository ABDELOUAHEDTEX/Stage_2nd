from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.models import Station, SessionLocal
from app.schemas import AnalyticsResponse

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter()

@router.get("/", response_model=AnalyticsResponse)
def get_analytics(db: Session = Depends(get_db)):
    """Génère les statistiques globales"""
    total = db.query(Station).count()
    actives = db.query(Station).filter(Station.etat_station == "en activité").count()
    arret = db.query(Station).filter(Station.etat_station == "en arrêt").count()
    
    # Par province
    provinces_query = db.execute(text("""
        SELECT province_prefecture, COUNT(*) as count
        FROM stations
        GROUP BY province_prefecture
        ORDER BY count DESC
    """))
    by_province = {row[0]: row[1] for row in provinces_query}
    
    # Par société
    societes_query = db.execute(text("""
        SELECT societe, COUNT(*) as count
        FROM stations
        WHERE societe IS NOT NULL
        GROUP BY societe
        ORDER BY count DESC
    """))
    by_societe = {row[0]: row[1] for row in societes_query}
    
    # Par type
    types_query = db.execute(text("""
        SELECT type_station, COUNT(*) as count
        FROM stations
        WHERE type_station IS NOT NULL
        GROUP BY type_station
        ORDER BY count DESC
    """))
    by_type = {row[0]: row[1] for row in types_query}
    
    return {
        "total_stations": total,
        "stations_actives": actives,
        "stations_arret": arret,
        "by_province": by_province,
        "by_societe": by_societe,
        "by_type": by_type
    }

@router.get("/filters")
def get_filter_options(db: Session = Depends(get_db)):
    """Récupère les options disponibles pour les filtres"""
    provinces = db.execute(text("SELECT DISTINCT province_prefecture FROM stations WHERE province_prefecture IS NOT NULL ORDER BY province_prefecture")).fetchall()
    societes = db.execute(text("SELECT DISTINCT societe FROM stations WHERE societe IS NOT NULL ORDER BY societe")).fetchall()
    types = db.execute(text("SELECT DISTINCT type_station FROM stations WHERE type_station IS NOT NULL ORDER BY type_station")).fetchall()
    
    return {
        "provinces": [p[0] for p in provinces],
        "societes": [s[0] for s in societes],
        "types": [t[0] for t in types],
        "etats": ["en activité", "en arrêt"]
    }

@router.get("/timeline")
def get_timeline(db: Session = Depends(get_db)):
    """Évolution du nombre de stations par année"""
    query = db.execute(text("""
        SELECT 
            EXTRACT(YEAR FROM date_creation) as year,
            COUNT(*) as count
        FROM stations
        WHERE date_creation IS NOT NULL
        GROUP BY year
        ORDER BY year
    """))
    
    return [{"year": int(row[0]), "count": row[1]} for row in query]

@router.get("/map-data")
def get_map_data(db: Session = Depends(get_db)):
    """Données pour la carte interactive"""
    query = db.query(
        Station.id,
        Station.societe,
        Station.type_station,
        Station.adresse,
        Station.province_prefecture,
        Station.etat_station,
        Station.latitude,
        Station.longitude
    ).filter(
        Station.latitude.isnot(None),
        Station.longitude.isnot(None)
    ).all()
    
    return [
        {
            "id": s.id,
            "societe": s.societe,
            "type": s.type_station,
            "adresse": s.adresse,
            "province": s.province_prefecture,
            "etat": s.etat_station,
            "lat": s.latitude,
            "lng": s.longitude
        }
        for s in query
    ]
