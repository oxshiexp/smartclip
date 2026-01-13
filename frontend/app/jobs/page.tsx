"use client";

import * as React from "react";
import { RefreshCw, Search } from "lucide-react";

import { JobTable, type JobRow } from "@/components/JobTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ToastProvider";

const initialJobs: JobRow[] = [
  {
    id: "JOB-9124",
    source: "youtube.com/watch?v=clip01",
    createdAt: "2 min ago",
    status: "running",
    progress: 48,
  },
  {
    id: "JOB-9123",
    source: "tiktok.com/@creator/live",
    createdAt: "18 min ago",
    status: "queued",
    progress: 12,
  },
  {
    id: "JOB-9122",
    source: "local://upload/stream.mp4",
    createdAt: "1 hour ago",
    status: "failed",
    progress: 64,
  },
  {
    id: "JOB-9121",
    source: "youtube.com/watch?v=clip02",
    createdAt: "3 hours ago",
    status: "done",
    progress: 100,
  },
];

export default function JobsPage() {
  const { pushToast } = useToast();
  const [loading, setLoading] = React.useState(true);
  const [jobs, setJobs] = React.useState<JobRow[]>(initialJobs);
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("all");

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setJobs((prev) =>
        prev.map((job) =>
          job.status === "running"
            ? { ...job, progress: Math.min(job.progress + 6, 100) }
            : job
        )
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.id.toLowerCase().includes(search.toLowerCase()) ||
      job.source.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "all" || job.status === status;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Jobs</h1>
          <p className="text-sm text-muted-foreground">
            Auto-refreshing every 4 seconds for quick status checks.
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={() => pushToast({ title: "Jobs refreshed" })}
        >
          <RefreshCw className="h-4 w-4" />
          Refresh now
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_auto]">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by URL or job id"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="all">All status</option>
              <option value="queued">Queued</option>
              <option value="running">Running</option>
              <option value="failed">Failed</option>
              <option value="done">Done</option>
            </Select>
            <Button
              variant="ghost"
              onClick={() => {
                setSearch("");
                setStatus("all");
              }}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      ) : (
        <JobTable jobs={filteredJobs} />
      )}
    </div>
  );
}
