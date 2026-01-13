import Link from "next/link";
import { Eye } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { StatusBadge, type JobStatus } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";

export interface JobRow {
  id: string;
  source: string;
  createdAt: string;
  status: JobStatus;
  progress: number;
}

export function JobTable({ jobs }: { jobs: JobRow[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-4 py-3">Job ID</th>
            <th className="px-4 py-3">Source</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Progress</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border-t">
              <td className="px-4 py-4 font-medium text-foreground">{job.id}</td>
              <td className="px-4 py-4 text-muted-foreground">{job.source}</td>
              <td className="px-4 py-4 text-muted-foreground">{job.createdAt}</td>
              <td className="px-4 py-4">
                <StatusBadge status={job.status} />
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <Progress value={job.progress} className="h-2" />
                  <span className="text-xs text-muted-foreground">{job.progress}%</span>
                </div>
              </td>
              <td className="px-4 py-4 text-right">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/jobs/${job.id}`} className="inline-flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    View
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
