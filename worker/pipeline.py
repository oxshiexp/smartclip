import random
from pathlib import Path
from typing import Dict, List

from .hooks import pick_top_segments, score_segment
from .metadata import generate_metadata
from .render import generate_thumbnail, render_clip
from .subtitles import Caption, format_ass, format_srt
from .utils import ensure_dir, run_command


class Pipeline:
    def __init__(self, job_id: str, payload: dict) -> None:
        self.job_id = job_id
        self.payload = payload
        self.job_dir = ensure_dir(Path("/data") / "jobs" / job_id)
        self.video_path = self.job_dir / "source.mp4"
        self.audio_path = self.job_dir / "audio.wav"

    def download_video(self) -> None:
        run_command([
            "yt-dlp",
            "-f",
            "mp4",
            "-o",
            str(self.video_path),
            self.payload["youtube_url"],
        ])

    def extract_audio(self) -> None:
        run_command([
            "ffmpeg",
            "-y",
            "-i",
            str(self.video_path),
            "-vn",
            "-ac",
            "1",
            "-ar",
            "48000",
            str(self.audio_path),
        ])

    def analyze_segments(self) -> List[Dict]:
        segments = []
        for idx in range(12):
            text = random.choice(
                [
                    "Ternyata trik ini bikin hasil lebih cepat?",
                    "Wow hasilnya gila banget",
                    "Ini rahasia yang jarang dibahas",
                    "Padahal caranya cuma begini",
                ]
            )
            metrics = score_segment(text, rms=random.uniform(0.5, 1.2), pitch_var=random.uniform(0.3, 1.1))
            segments.append(
                {
                    "start": idx * 30,
                    "end": idx * 30 + random.uniform(18, 42),
                    "text": text,
                    **metrics,
                }
            )
        return pick_top_segments(segments)

    def create_captions(self, text: str, duration: float) -> List[Caption]:
        words = text.split()
        words_per_second = max(len(words) / max(duration, 1), 2)
        captions: List[Caption] = []
        chunk = []
        start = 0.0
        for idx, word in enumerate(words, start=1):
            chunk.append(word)
            if len(chunk) >= 6 or idx == len(words):
                end = min(duration, start + len(chunk) / words_per_second)
                captions.append(Caption(start=start, end=end, text=" ".join(chunk)))
                start = end
                chunk = []
        return captions

    def render_outputs(self, segments: List[Dict]) -> List[Dict]:
        clips = []
        for idx, segment in enumerate(segments, start=1):
            clip_id = f"{self.job_id}-clip-{idx}"
            clip_path = self.job_dir / f"clip-{idx}.mp4"
            thumb_path = self.job_dir / f"clip-{idx}.jpg"
            captions = self.create_captions(segment["text"], segment["end"] - segment["start"])
            ass_path = self.job_dir / f"clip-{idx}.ass"
            srt_path = self.job_dir / f"clip-{idx}.srt"
            ass_path.write_text(format_ass(captions))
            srt_path.write_text(format_srt(captions))
            render_clip(self.video_path, clip_path, segment["start"], segment["end"] - segment["start"], ass_path)
            generate_thumbnail(self.video_path, thumb_path, segment["start"] + 1)
            metadata = generate_metadata("Smart Clip", idx)
            clips.append(
                {
                    "id": clip_id,
                    "start_sec": segment["start"],
                    "end_sec": segment["end"],
                    "viral_score": segment["viral_score"],
                    "hook_strength": segment["hook_strength"],
                    "pacing": segment["pacing"],
                    "clarity": segment["clarity"],
                    "visual_dynamics": segment["visual_dynamics"],
                    "novelty": segment["novelty"],
                    "title": metadata["title"],
                    "caption": metadata["caption"],
                    "tags": metadata["tags"],
                    "preview_url": f"/data/jobs/{self.job_id}/clip-{idx}.mp4",
                    "thumbnail_url": f"/data/jobs/{self.job_id}/clip-{idx}.jpg",
                }
            )
        return clips
