import json
from pathlib import Path
from typing import Optional

from cryptography.fernet import Fernet

from .models import SettingsResponse, UpdateSettingsRequest
from .settings import settings


def _settings_path() -> Path:
    path = Path(settings.data_dir) / "settings.json"
    if not path.exists():
        path.write_text(json.dumps({"youtube_refresh_token": None, "processing_config": {}, "storage_cleanup_days": 7}))
    return path


def _get_fernet() -> Optional[Fernet]:
    if not settings.encryption_key:
        return None
    return Fernet(settings.encryption_key)


def get_settings() -> SettingsResponse:
    data = json.loads(_settings_path().read_text())
    connected = data.get("youtube_refresh_token") is not None
    return SettingsResponse(
        youtube_connected=connected,
        processing_config=data.get("processing_config", {}),
        storage_cleanup_days=data.get("storage_cleanup_days", 7),
    )


def update_settings(payload: UpdateSettingsRequest) -> SettingsResponse:
    data = json.loads(_settings_path().read_text())
    if payload.processing_config is not None:
        data["processing_config"] = payload.processing_config
    if payload.storage_cleanup_days is not None:
        data["storage_cleanup_days"] = payload.storage_cleanup_days
    _settings_path().write_text(json.dumps(data, indent=2))
    return get_settings()


def save_refresh_token(token: str) -> None:
    data = json.loads(_settings_path().read_text())
    fernet = _get_fernet()
    encrypted = fernet.encrypt(token.encode()).decode() if fernet else token
    data["youtube_refresh_token"] = encrypted
    _settings_path().write_text(json.dumps(data, indent=2))


def load_refresh_token() -> Optional[str]:
    data = json.loads(_settings_path().read_text())
    token = data.get("youtube_refresh_token")
    if not token:
        return None
    fernet = _get_fernet()
    return fernet.decrypt(token.encode()).decode() if fernet else token
