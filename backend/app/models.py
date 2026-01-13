from datetime import datetime
from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, HttpUrl, Field


class JobStatus(str, Enum):
    queued = "queued"
    processing = "processing"
    completed = "completed"
    failed = "failed"


class ClipStatus(str, Enum):
    ready = "ready"
    uploading = "uploading"
    uploaded = "uploaded"
    error = "error"


class CreateJobRequest(BaseModel):
    youtube_url: HttpUrl
    hook_mode: str = Field(default="smart", description="smart or aggressive")
    clip_count: int = Field(default=5, ge=1, le=10)
    subtitle_style: str = Field(default="clean")


class JobBase(BaseModel):
    id: str
    youtube_url: HttpUrl
    status: JobStatus
    created_at: datetime
    updated_at: datetime


class ClipResult(BaseModel):
    id: str
    job_id: str
    start_sec: float
    end_sec: float
    viral_score: float
    hook_strength: float
    pacing: float
    clarity: float
    visual_dynamics: float
    novelty: float
    status: ClipStatus
    title: str
    caption: str
    tags: List[str]
    preview_url: Optional[str] = None
    thumbnail_url: Optional[str] = None


class JobDetail(JobBase):
    progress: int = 0
    logs: List[str] = []
    clips: List[ClipResult] = []


class JobListResponse(BaseModel):
    jobs: List[JobBase]


class JobResultsResponse(BaseModel):
    job: JobDetail


class UploadRequest(BaseModel):
    privacy_status: str = "private"


class SettingsResponse(BaseModel):
    youtube_connected: bool
    processing_config: dict
    storage_cleanup_days: int


class UpdateSettingsRequest(BaseModel):
    processing_config: Optional[dict] = None
    storage_cleanup_days: Optional[int] = None
