import json
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List

from .models import JobDetail, JobStatus, ClipResult, ClipStatus
from .settings import settings


class Storage:
    def __init__(self, data_dir: str) -> None:
        self.data_dir = Path(data_dir)
        self.data_dir.mkdir(parents=True, exist_ok=True)
        self.jobs_path = self.data_dir / "jobs.json"
        if not self.jobs_path.exists():
            self.jobs_path.write_text(json.dumps({}))

    def _read(self) -> Dict[str, dict]:
        return json.loads(self.jobs_path.read_text())

    def _write(self, data: Dict[str, dict]) -> None:
        self.jobs_path.write_text(json.dumps(data, default=str, indent=2))

    def create_job(self, youtube_url: str) -> JobDetail:
        now = datetime.now(timezone.utc)
        job_id = str(uuid.uuid4())
        job = JobDetail(
            id=job_id,
            youtube_url=youtube_url,
            status=JobStatus.queued,
            created_at=now,
            updated_at=now,
            progress=0,
            logs=["Job created"],
            clips=[],
        )
        data = self._read()
        data[job_id] = job.model_dump()
        self._write(data)
        return job

    def list_jobs(self) -> List[JobDetail]:
        data = self._read()
        jobs = [JobDetail(**payload) for payload in data.values()]
        return sorted(jobs, key=lambda job: job.created_at, reverse=True)

    def get_job(self, job_id: str) -> JobDetail:
        data = self._read()
        payload = data[job_id]
        return JobDetail(**payload)

    def update_job(self, job: JobDetail) -> None:
        data = self._read()
        data[job.id] = job.model_dump()
        self._write(data)

    def update_job_status(self, job_id: str, status: JobStatus, progress: int) -> JobDetail:
        job = self.get_job(job_id)
        job.status = status
        job.progress = progress
        job.updated_at = datetime.now(timezone.utc)
        self.update_job(job)
        return job

    def append_log(self, job_id: str, message: str) -> None:
        job = self.get_job(job_id)
        job.logs.append(message)
        job.updated_at = datetime.now(timezone.utc)
        self.update_job(job)

    def add_clip(self, job_id: str, clip: ClipResult) -> None:
        job = self.get_job(job_id)
        job.clips.append(clip)
        job.updated_at = datetime.now(timezone.utc)
        self.update_job(job)

    def update_clip_status(self, job_id: str, clip_id: str, status: ClipStatus) -> None:
        job = self.get_job(job_id)
        for clip in job.clips:
            if clip.id == clip_id:
                clip.status = status
        job.updated_at = datetime.now(timezone.utc)
        self.update_job(job)


storage = Storage(settings.data_dir)
