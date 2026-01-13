import subprocess
from pathlib import Path
from typing import List


def run_command(cmd: List[str]) -> None:
    subprocess.run(cmd, check=True)


def ensure_dir(path: Path) -> Path:
    path.mkdir(parents=True, exist_ok=True)
    return path
