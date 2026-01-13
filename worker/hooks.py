import math
from typing import List, Dict

EMOTIONAL_KEYWORDS = {
    "wow",
    "gila",
    "incredible",
    "unbelievable",
    "ternyata",
    "padahal",
    "tapi",
    "jadi",
    "serius",
}

INTRO_PHRASES = {"hai", "halo", "selamat", "welcome", "subscribe", "like"}


def score_segment(text: str, rms: float, pitch_var: float) -> Dict[str, float]:
    tokens = text.lower().split()
    excitement = sum(1 for token in tokens if token in EMOTIONAL_KEYWORDS)
    intro_penalty = sum(1 for token in tokens if token in INTRO_PHRASES)
    has_question = "?" in text
    has_contrast = any(word in text.lower() for word in ["tapi", "ternyata", "padahal"])
    big_number = any(char.isdigit() for char in text)

    hook_strength = min(100.0, 30 + excitement * 10 + rms * 15 + pitch_var * 10)
    pacing = min(100.0, 40 + rms * 20)
    clarity = max(10.0, 80 - intro_penalty * 10)
    visual_dynamics = min(100.0, 50 + pitch_var * 30)
    novelty = min(100.0, 40 + (10 if has_question else 0) + (10 if has_contrast else 0) + (10 if big_number else 0))

    viral_score = (hook_strength * 0.3 + pacing * 0.2 + clarity * 0.2 + visual_dynamics * 0.15 + novelty * 0.15)
    return {
        "viral_score": round(viral_score, 2),
        "hook_strength": round(hook_strength, 2),
        "pacing": round(pacing, 2),
        "clarity": round(clarity, 2),
        "visual_dynamics": round(visual_dynamics, 2),
        "novelty": round(novelty, 2),
    }


def pick_top_segments(segments: List[Dict]) -> List[Dict]:
    sorted_segments = sorted(segments, key=lambda seg: seg["viral_score"], reverse=True)
    return sorted_segments[:10]
