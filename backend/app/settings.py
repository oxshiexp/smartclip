from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    redis_url: str = "redis://redis:6379/0"
    data_dir: str = "/data"
    api_base_url: str = "http://localhost:8000"
    web_base_url: str = "http://localhost:3000"
    oauth_client_id: str = ""
    oauth_client_secret: str = ""
    oauth_redirect_uri: str = ""
    encryption_key: str = ""

    class Config:
        env_file = ".env"


settings = Settings()
