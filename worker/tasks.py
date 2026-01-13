from datetime import datetime, timezone
from typing import Dict

from .pipeline import Pipeline
from .storage import append_log, read_jobs, update_job


def process_job(job_id: str, payload: Dict) -> None:
    append_log(job_id, "Worker started")
    update_job(job_id, {"status": "processing", "progress": 5})
    pipeline = Pipeline(job_id, payload)
    append_log(job_id, "Downloading video")
    pipeline.download_video()
    update_job(job_id, {"progress": 20})
    append_log(job_id, "Extracting audio")
    pipeline.extract_audio()
    update_job(job_id, {"progress": 40})
    append_log(job_id, "Analyzing hooks")
    segments = pipeline.analyze_segments()
    update_job(job_id, {"progress": 60})
    append_log(job_id, "Rendering clips")
    clips = pipeline.render_outputs(segments)
    data = read_jobs()
    job = data[job_id]
    job["clips"] = [
        {**clip, "job_id": job_id, "status": "ready"} for clip in clips
    ]
    job["progress"] = 100
    job["status"] = "completed"
    job["updated_at"] = datetime.now(timezone.utc).isoformat()
    data[job_id] = job
    update_job(job_id, job)
    append_log(job_id, "Job completed")


def upload_clip(job_id: str, clip_id: str, payload: Dict) -> None:
    append_log(job_id, f"Uploading clip {clip_id} to YouTube with {payload}")
    update_job(job_id, {"status": "processing"})
    append_log(job_id, "Upload completed (stub)")
