from dataclasses import dataclass
from typing import List


@dataclass
class WordTimestamp:
    word: str
    start: float
    end: float


@dataclass
class Caption:
    start: float
    end: float
    text: str


def group_words(words: List[WordTimestamp], max_chars: int = 32) -> List[Caption]:
    captions: List[Caption] = []
    buffer: List[str] = []
    start = None
    end = None
    for word in words:
        if start is None:
            start = word.start
        if end is None:
            end = word.end
        if sum(len(w) for w in buffer) + len(word.word) + len(buffer) > max_chars:
            captions.append(Caption(start=start, end=end or word.end, text=" ".join(buffer)))
            buffer = []
            start = word.start
        buffer.append(word.word)
        end = word.end
    if buffer:
        captions.append(Caption(start=start or 0.0, end=end or (start or 0.0) + 1.0, text=" ".join(buffer)))
    return captions


def format_srt(captions: List[Caption]) -> str:
    lines = []
    for idx, caption in enumerate(captions, start=1):
        lines.append(str(idx))
        lines.append(f"{_format_time(caption.start)} --> {_format_time(caption.end)}")
        lines.append(caption.text)
        lines.append("")
    return "\n".join(lines)


def format_ass(captions: List[Caption]) -> str:
    header = """[Script Info]\nScriptType: v4.00+\nPlayResX: 1080\nPlayResY: 1920\n\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\nStyle: Default,Arial,64,&H00FFFFFF,&H000000FF,&H00000000,&H64000000,-1,0,0,0,100,100,0,0,1,3,0,2,60,60,120,1\n\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n"""
    events = []
    for caption in captions:
        events.append(
            f"Dialogue: 0,{_format_time(caption.start, ass=True)},{_format_time(caption.end, ass=True)},Default,,0,0,0,,{caption.text}"
        )
    return header + "\n".join(events)


def _format_time(value: float, ass: bool = False) -> str:
    hours = int(value // 3600)
    minutes = int((value % 3600) // 60)
    seconds = value % 60
    if ass:
        return f"{hours}:{minutes:02d}:{seconds:05.2f}"
    return f"{hours:02d}:{minutes:02d}:{seconds:06.3f}".replace(".", ",")
