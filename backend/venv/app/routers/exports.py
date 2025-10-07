from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.models import SessionLocal
from app.services.export_service import ExportService

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter()

@router.get("/pdf")
def export_pdf(db: Session = Depends(get_db)):
    """Export PDF des stations"""
    export_service = ExportService(db)
    return export_service.export_pdf()

@router.get("/excel")
def export_excel(db: Session = Depends(get_db)):
    """Export Excel des stations"""
    export_service = ExportService(db)
    return export_service.export_excel()

@router.get("/csv")
def export_csv(db: Session = Depends(get_db)):
    """Export CSV des stations"""
    export_service = ExportService(db)
    return export_service.export_csv()