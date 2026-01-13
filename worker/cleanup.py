from datetime import datetime, timedelta, timezone
from pathlib import Path


def cleanup(data_dir: Path, days: int = 7) -> int:
    cutoff = datetime.now(timezone.utc) - timedelta(days=days)
    removed = 0
    jobs_dir = data_dir / "jobs"
    if not jobs_dir.exists():
        return removed
    for job_path in jobs_dir.iterdir():
        if not job_path.is_dir():
            continue
        mtime = datetime.fromtimestamp(job_path.stat().st_mtime, tz=timezone.utc)
        if mtime < cutoff:
            for child in job_path.iterdir():
                if child.is_file():
                    child.unlink()
            job_path.rmdir()
            removed += 1
    return removed


if __name__ == "__main__":
    cleaned = cleanup(Path("/data"))
    print(f"Removed {cleaned} jobs")
