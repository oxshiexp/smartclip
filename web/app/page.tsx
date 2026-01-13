import Layout from "@/components/layout";
import { fetchJobs } from "@/lib/api";
import { Sparkles } from "lucide-react";

export default async function DashboardPage() {
  const data = await fetchJobs();
  const jobs = data?.jobs ?? [];

  return (
    <Layout>
      <div className="container-page space-y-8 py-8">
        <section className="card space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Create New Job</h2>
              <p className="text-sm text-foreground/60">
                Masukkan URL YouTube dan biarkan Smart-Clipper membuat Shorts viral otomatis.
              </p>
            </div>
            <Sparkles className="h-6 w-6 text-foreground/60" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <input className="input" placeholder="https://youtube.com/watch?v=..." />
            <div className="flex gap-3">
              <select className="input">
                <option>Smart Hook Mode</option>
                <option>Aggressive Viral Mode</option>
              </select>
              <select className="input">
                <option>5 clips</option>
                <option>7 clips</option>
                <option>10 clips</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="button-primary">Create Job</button>
            <button className="button-secondary">Advanced Options</button>
          </div>
        </section>

        <section className="card">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Jobs</h3>
            <span className="badge">Auto-refresh</span>
          </div>
          <div className="mt-6 space-y-4">
            {jobs.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border p-6 text-sm text-foreground/60">
                Belum ada job. Mulai dengan input URL YouTube pertama Anda.
              </div>
            )}
            {jobs.map((job: any) => (
              <div key={job.id} className="flex items-center justify-between rounded-2xl border border-border p-4">
                <div>
                  <p className="text-sm font-semibold">{job.youtube_url}</p>
                  <p className="text-xs text-foreground/60">Status: {job.status}</p>
                </div>
                <button className="button-secondary">View</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
