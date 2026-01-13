from pathlib import Path
from typing import List

from .utils import run_command


def render_clip(source: Path, output: Path, start: float, duration: float, subtitle_ass: Path) -> None:
    cmd = [
        "ffmpeg",
        "-y",
        "-ss",
        str(start),
        "-i",
        str(source),
        "-t",
        str(duration),
        "-vf",
        "scale=1080:1920:force_original_aspect_ratio=cover,crop=1080:1920,subtitles=" + str(subtitle_ass),
        "-af",
        "afade=t=in:st=0:d=0.2,afade=t=out:st=0.2:d=0.2",
        "-c:v",
        "libx264",
        "-preset",
        "fast",
        "-c:a",
        "aac",
        str(output),
    ]
    run_command(cmd)


def generate_thumbnail(source: Path, output: Path, timestamp: float) -> None:
    cmd = [
        "ffmpeg",
        "-y",
        "-ss",
        str(timestamp),
        "-i",
        str(source),
        "-vframes",
        "1",
        "-q:v",
        "2",
        str(output),
    ]
    run_command(cmd)
