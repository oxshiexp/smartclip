import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict


DATA_DIR = Path("/data")
JOBS_PATH = DATA_DIR / "jobs.json"


def ensure_storage() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    if not JOBS_PATH.exists():
        JOBS_PATH.write_text(json.dumps({}))


def read_jobs() -> Dict[str, dict]:
    ensure_storage()
    return json.loads(JOBS_PATH.read_text())


def write_jobs(data: Dict[str, dict]) -> None:
    JOBS_PATH.write_text(json.dumps(data, default=str, indent=2))


def update_job(job_id: str, updates: dict) -> None:
    data = read_jobs()
    job = data[job_id]
    job.update(updates)
    job["updated_at"] = datetime.now(timezone.utc).isoformat()
    data[job_id] = job
    write_jobs(data)


def append_log(job_id: str, message: str) -> None:
    data = read_jobs()
    job = data[job_id]
    job.setdefault("logs", []).append(message)
    job["updated_at"] = datetime.now(timezone.utc).isoformat()
    data[job_id] = job
    write_jobs(data)
