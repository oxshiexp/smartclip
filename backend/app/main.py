from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from redis import Redis
from rq import Queue

from .logging_config import setup_logging
from .models import (
    CreateJobRequest,
    JobDetail,
    JobListResponse,
    JobResultsResponse,
    JobStatus,
    UploadRequest,
    SettingsResponse,
    UpdateSettingsRequest,
)
from .settings import settings
from .storage import storage
from .youtube import get_settings, update_settings

setup_logging()

app = FastAPI(title="Smart-Clipper API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

redis = Redis.from_url(settings.redis_url)
queue = Queue("smartclip", connection=redis)


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}


@app.post("/api/jobs", response_model=JobDetail)
async def create_job(payload: CreateJobRequest) -> JobDetail:
    job = storage.create_job(payload.youtube_url)
    queue.enqueue("worker.tasks.process_job", job.id, payload.model_dump())
    storage.append_log(job.id, "Job queued")
    return job


@app.get("/api/jobs", response_model=JobListResponse)
async def list_jobs() -> JobListResponse:
    jobs = storage.list_jobs()
    return JobListResponse(jobs=jobs)


@app.get("/api/jobs/{job_id}", response_model=JobDetail)
async def get_job(job_id: str) -> JobDetail:
    try:
        return storage.get_job(job_id)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail="Job not found") from exc


@app.get("/api/jobs/{job_id}/results", response_model=JobResultsResponse)
async def get_job_results(job_id: str) -> JobResultsResponse:
    try:
        job = storage.get_job(job_id)
        return JobResultsResponse(job=job)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail="Job not found") from exc


@app.put("/api/clips/{clip_id}", response_model=JobDetail)
async def update_clip(clip_id: str) -> JobDetail:
    jobs = storage.list_jobs()
    for job in jobs:
        for clip in job.clips:
            if clip.id == clip_id:
                storage.update_clip_status(job.id, clip_id, clip.status)
                return storage.get_job(job.id)
    raise HTTPException(status_code=404, detail="Clip not found")


@app.post("/api/clips/{clip_id}/upload", response_model=JobDetail)
async def upload_clip(clip_id: str, payload: UploadRequest) -> JobDetail:
    jobs = storage.list_jobs()
    for job in jobs:
        for clip in job.clips:
            if clip.id == clip_id:
                queue.enqueue("worker.tasks.upload_clip", job.id, clip_id, payload.model_dump())
                storage.append_log(job.id, f"Upload queued for clip {clip_id}")
                return storage.get_job(job.id)
    raise HTTPException(status_code=404, detail="Clip not found")


@app.get("/api/settings", response_model=SettingsResponse)
async def fetch_settings() -> SettingsResponse:
    return get_settings()


@app.put("/api/settings", response_model=SettingsResponse)
async def save_settings(payload: UpdateSettingsRequest) -> SettingsResponse:
    return update_settings(payload)


@app.get("/api/jobs/{job_id}/status")
async def job_status(job_id: str) -> dict:
    job = storage.get_job(job_id)
    return {"id": job.id, "status": job.status, "progress": job.progress}
