# SMART-CLIPPER

Production-ready, full-stack YouTube Shorts automation suite. Input a YouTube URL, detect viral hooks, auto-cut into Shorts, generate subtitles, preview clips, and upload via official YouTube API.

## Features
- **Async FastAPI backend** with structured JSON logs
- **Redis + RQ worker pipeline** for heavy processing
- **faster-whisper + VAD** subtitle pipeline
- **Hook scoring engine** (audio energy + semantic curiosity + anti-boring)
- **Auto-render 9:16 clips** with subtitles burn-in
- **Next.js Web UI** with dashboard, jobs, detail, and settings
- **Docker-first**: run on any VPS, no SaaS required

---

## Tech Stack
- **Backend**: FastAPI (async), Redis, RQ
- **Worker**: Python, ffmpeg, yt-dlp, faster-whisper, librosa, webrtcvad
- **Frontend**: Next.js + TailwindCSS + lucide-react
- **Infra**: Docker + docker-compose, restart policy always

---

## 1) Install Docker on Ubuntu
```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER
```
Log out and back in after adding user to the docker group.

---

## 2) YouTube API & OAuth Setup
1. Open Google Cloud Console: https://console.cloud.google.com
2. Create a project → Enable **YouTube Data API v3**.
3. Create OAuth 2.0 Client ID (Web Application).
4. Set redirect URI:
   - `http://localhost:8000/oauth/callback`
5. Copy **Client ID** and **Client Secret** into `.env`.

Generate encryption key for refresh tokens:
```bash
python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
```

---

## 3) Configure Environment
```bash
cp .env.example .env
```
Update `.env` values:
- `OAUTH_CLIENT_ID`
- `OAUTH_CLIENT_SECRET`
- `ENCRYPTION_KEY`

---

## 4) Run Everything
```bash
docker compose up -d
```
Services:
- API → http://localhost:8000
- Web UI → http://localhost:3000

---

## 5) API Endpoints
- `POST /api/jobs`
- `GET /api/jobs`
- `GET /api/jobs/{id}`
- `GET /api/jobs/{id}/results`
- `POST /api/clips/{id}/upload`
- `PUT /api/clips/{id}`
- `GET /api/settings`
- `PUT /api/settings`
- `GET /health`

---

## Troubleshooting
- **Worker stuck**: ensure `ffmpeg` and `yt-dlp` are installed in container (already in Dockerfile).
- **No subtitles**: confirm `faster-whisper` model can download (requires internet).
- **OAuth issues**: verify redirect URI matches exactly.
- **Redis connection errors**: check `REDIS_URL` in `.env`.

---

## Project Structure
```
backend/        FastAPI API
worker/         RQ worker pipeline
web/            Next.js frontend
```

---

## Cleanup Policy
- Old job artifacts are deleted automatically after **7 days** via the `cleanup` service.

---

## License
MIT
