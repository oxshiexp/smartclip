"use client";

import * as React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ToastProvider";

const recentJobs: [] = [];

export default function DashboardPage() {
  const { pushToast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const handleCreate = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setLoading(false);
    pushToast({
      title: "Job created",
      description: "We started processing your video in the background.",
    });
  };

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Smart Clipper
        </p>
        <h1 className="text-3xl font-semibold">Create your next viral batch</h1>
        <p className="text-sm text-muted-foreground">
          Paste a URL, pick your preferences, and let Smart Clipper handle the rest.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>New job</CardTitle>
          <CardDescription>Generate shorts with consistent metadata and subtitles.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold">Source URL</label>
                <Input placeholder="https://www.youtube.com/watch?v=..." />
                <p className="text-xs text-muted-foreground">
                  Supports YouTube, TikTok, and local file links.
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold">Clip preference</label>
                <Select defaultValue="auto">
                  <option value="auto">Auto detect best segments</option>
                  <option value="manual">Use timestamps from CSV</option>
                  <option value="chapters">Use chapters only</option>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold">Hook mode</label>
                <Select defaultValue="viral">
                  <option value="viral">Viral hook first</option>
                  <option value="neutral">Neutral pacing</option>
                  <option value="short">Super short (under 10s)</option>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold">Subtitle style</label>
                <Select defaultValue="modern">
                  <option value="modern">Modern minimal</option>
                  <option value="karaoke">Karaoke highlight</option>
                  <option value="classic">Classic outline</option>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold">Upload destination</label>
                <Select defaultValue="queue">
                  <option value="queue">Queue for approval</option>
                  <option value="auto">Auto upload after render</option>
                  <option value="off">Skip upload</option>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold">Notes</label>
                <Textarea placeholder="Optional notes for this job." className="min-h-[120px]" />
                <p className="text-xs text-muted-foreground">
                  These notes stay with the job for your team.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Estimated processing time: 4-8 minutes.
          </p>
          <Button isLoading={loading} onClick={handleCreate}>
            <Plus className="h-4 w-4" />
            Create Job
          </Button>
        </CardFooter>
      </Card>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent jobs</h2>
          <Button variant="ghost">View all</Button>
        </div>
        {recentJobs.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
              <svg
                width="160"
                height="120"
                viewBox="0 0 160 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="20" y="20" width="120" height="80" rx="16" fill="hsl(var(--muted))" />
                <rect x="38" y="38" width="84" height="12" rx="6" fill="hsl(var(--background))" />
                <rect x="38" y="58" width="64" height="12" rx="6" fill="hsl(var(--background))" />
                <circle cx="118" cy="78" r="10" fill="hsl(var(--primary))" />
              </svg>
              <div className="space-y-2">
                <p className="text-sm font-semibold">No jobs yet</p>
                <p className="text-xs text-muted-foreground">
                  Create your first job to start building clips.
                </p>
              </div>
              <Button>Create first job</Button>
            </CardContent>
          </Card>
        ) : null}
      </section>
    </div>
  );
}
