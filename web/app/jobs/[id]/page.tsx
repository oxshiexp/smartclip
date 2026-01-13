import Layout from "@/components/layout";
import { fetchJob } from "@/lib/api";

interface JobPageProps {
  params: { id: string };
}

export default async function JobDetailPage({ params }: JobPageProps) {
  const job = await fetchJob(params.id);

  return (
    <Layout>
      <div className="container-page space-y-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Job Detail</h2>
            <p className="text-sm text-foreground/60">{job.youtube_url}</p>
          </div>
          <span className="badge">{job.status}</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="card lg:col-span-2">
            <h3 className="text-lg font-semibold">Clips</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {(job.clips ?? []).map((clip: any) => (
                <div key={clip.id} className="rounded-2xl border border-border p-4">
                  <div className="h-32 rounded-xl bg-foreground/10" />
                  <div className="mt-3">
                    <p className="text-sm font-semibold">{clip.title}</p>
                    <p className="text-xs text-foreground/60">Viral score: {clip.viral_score}</p>
                    <button className="button-secondary mt-3 w-full">Upload</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold">Progress</h3>
              <div className="mt-4 h-2 rounded-full bg-foreground/10">
                <div className="h-2 rounded-full bg-foreground" style={{ width: `${job.progress ?? 0}%` }} />
              </div>
              <p className="mt-2 text-xs text-foreground/60">{job.progress ?? 0}%</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold">Logs</h3>
              <ul className="mt-4 space-y-2 text-xs text-foreground/60">
                {(job.logs ?? []).map((log: string, index: number) => (
                  <li key={index}>• {log}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
