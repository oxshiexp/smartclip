import Layout from "@/components/layout";
import { fetchJobs } from "@/lib/api";

export default async function JobsPage() {
  const data = await fetchJobs();
  const jobs = data?.jobs ?? [];

  return (
    <Layout>
      <div className="container-page space-y-6 py-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Jobs</h2>
          <button className="button-primary">Create Job</button>
        </div>
        <div className="card">
          <div className="grid grid-cols-4 gap-4 text-xs font-semibold uppercase text-foreground/60">
            <span>URL</span>
            <span>Status</span>
            <span>Progress</span>
            <span>Action</span>
          </div>
          <div className="mt-4 space-y-3">
            {jobs.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border p-6 text-sm text-foreground/60">
                Tidak ada job aktif saat ini.
              </div>
            )}
            {jobs.map((job: any) => (
              <div key={job.id} className="grid grid-cols-4 items-center gap-4 rounded-2xl border border-border p-4">
                <span className="text-sm">{job.youtube_url}</span>
                <span className="badge">{job.status}</span>
                <div>
                  <div className="h-2 rounded-full bg-foreground/10">
                    <div className="h-2 rounded-full bg-foreground" style={{ width: `${job.progress ?? 0}%` }} />
                  </div>
                  <p className="mt-1 text-xs text-foreground/60">{job.progress ?? 0}%</p>
                </div>
                <button className="button-secondary">Open</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
