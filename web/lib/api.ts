const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchJobs() {
  const res = await fetch(`${API_URL}/api/jobs`, { cache: "no-store" });
  return res.json();
}

export async function fetchJob(id: string) {
  const res = await fetch(`${API_URL}/api/jobs/${id}`, { cache: "no-store" });
  return res.json();
}
