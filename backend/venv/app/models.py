from sqlalchemy import create_engine, Column, Integer, String, Boolean, Date, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Configuration Database
DATABASE_URL = "postgresql://postgres:akb@localhost:5432/stations_db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class Station(Base):
    __tablename__ = "stations"
    
    id = Column(Integer, primary_key=True, index=True)
    societe = Column(String)
    type_station = Column(String)
    adresse = Column(String)
    province_prefecture = Column(String)
    urbain = Column(Boolean)
    date_creation = Column(Date)
    num_decision = Column(Integer)
    date_autorisation = Column(Date)
    region = Column(String)
    gerant = Column(String)
    etat_station = Column(String)
    type_gerance = Column(String)
    capacite = Column(Integer)
    latitude = Column(Float)
    longitude = Column(Float)
