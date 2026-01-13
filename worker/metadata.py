from typing import Dict, List


def generate_metadata(topic: str, index: int) -> Dict[str, List[str] | str]:
    title = f"{topic} | Clip Viral #{index}"
    caption = f"{topic} dalam versi singkat, langsung ke poin penting."
    tags = ["viral", "shorts", "smartclipper", topic]
    return {"title": title, "caption": caption, "tags": tags}
