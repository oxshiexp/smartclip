"use client";

import * as React from "react";
import { Copy, RotateCcw, Trash2 } from "lucide-react";

import { ClipCard, type ClipItem } from "@/components/ClipCard";
import { ProgressStepper } from "@/components/ProgressStepper";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ToastProvider";

const clipItems: ClipItem[] = [
  {
    id: "Clip 01",
    title: "The hook that doubles engagement",
    caption: "Watch how this simple opening changed everything.",
    score: 92,
    tags: ["#growth", "#content", "#shorts"],
    thumbnail: "/media/clip-01-thumb.jpg",
    video: "/media/clip-01.mp4",
    breakdown: "Hook strength 40 • Trend alignment 30 • Retention 22",
  },
  {
    id: "Clip 02",
    title: "3 edits to boost retention",
    caption: "Shorter jump cuts keep viewers locked in.",
    score: 84,
    tags: ["#editing", "#creator", "#viral"],
    thumbnail: "/media/clip-02-thumb.jpg",
    video: "/media/clip-02.mp4",
    breakdown: "Pacing 34 • Clarity 28 • Audio 22",
  },
];

const subtitleSegments = [
  { id: "01", text: "Let’s start with the hook in the first two seconds." },
  { id: "02", text: "Add clarity, then cut out the pauses." },
  { id: "03", text: "Finish with a clear call to action." },
];

export default function JobDetailPage() {
  const { pushToast } = useToast();
  const [logs, setLogs] = React.useState([
    "[12:45:01] Downloading source video...",
    "[12:45:12] Extracting audio track...",
    "[12:45:30] Whisper transcript finished.",
  ]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => [
        ...prev,
        `[12:45:${(prev.length + 15).toString().padStart(2, "0")}] Rendering clip ${
          prev.length - 1
        }...`,
      ]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Job detail
            </p>
            <h1 className="text-2xl font-semibold">How to edit viral hooks</h1>
            <p className="text-sm text-muted-foreground">youtube.com/watch?v=clip01</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary">Job details</Button>
              </DialogTrigger>
              <DialogContent className="fixed right-0 top-0 h-full max-w-md translate-x-0 translate-y-0 rounded-none rounded-l-2xl border-l">
                <DialogHeader>
                  <DialogTitle>Job overview</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-sm">
                  <div className="rounded-2xl border bg-muted/40 p-4">
                    <p className="text-xs text-muted-foreground">Job ID</p>
                    <p className="font-semibold">JOB-9124</p>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4">
                    <p className="text-xs text-muted-foreground">Source</p>
                    <p className="font-semibold">youtube.com/watch?v=clip01</p>
                  </div>
                  <div className="rounded-2xl border bg-muted/40 p-4">
                    <p className="text-xs text-muted-foreground">Output</p>
                    <p className="font-semibold">8 clips • 1080x1920</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="secondary"
              onClick={() => pushToast({ title: "Opening logs", description: "Switch to Logs tab." })}
            >
              Open Logs
            </Button>
            <Button variant="ghost" disabled>
              <RotateCcw className="h-4 w-4" />
              Retry Failed Steps
            </Button>
            <Button variant="destructive">
              <Trash2 className="h-4 w-4" />
              Delete Job
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <StatusBadge status="running" />
          <div className="text-sm text-muted-foreground">Progress 64%</div>
        </div>
        <ProgressStepper activeStep={4} />
      </section>

      <Tabs defaultValue="clips">
        <TabsList>
          <TabsTrigger value="clips">Clips</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="subtitle">Subtitle</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="clips">
          <div className="grid gap-6 lg:grid-cols-2">
            {clipItems.map((clip) => (
              <ClipCard key={clip.id} clip={clip} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upload">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Card>
              <CardHeader>
                <CardTitle>YouTube account</CardTitle>
                <CardDescription>Manage connection before publishing.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border bg-muted/40 p-4 text-sm">
                  Connected as <span className="font-semibold">creator@smartclip.io</span>
                </div>
                <Button
                  onClick={() =>
                    pushToast({ title: "YouTube connected", description: "OAuth token refreshed." })
                  }
                >
                  Connect YouTube account
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Upload settings</CardTitle>
                <CardDescription>Apply defaults for all clips.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold">Privacy</label>
                  <Select defaultValue="unlisted">
                    <option value="public">Public</option>
                    <option value="unlisted">Unlisted</option>
                    <option value="private">Private</option>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold">Schedule upload</label>
                  <Input type="datetime-local" />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() =>
                    pushToast({ title: "Upload queued", description: "All clips scheduled." })
                  }
                >
                  Upload All
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subtitle">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <Card>
              <CardHeader>
                <CardTitle>Subtitle controls</CardTitle>
                <CardDescription>Improve readability for short-form content.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <label className="flex items-center gap-3 text-sm">
                  <input type="checkbox" className="h-4 w-4 rounded border" defaultChecked />
                  Enable high accuracy mode
                </label>
                <div className="space-y-2">
                  <label className="text-xs font-semibold">Max chars per line</label>
                  <Input type="number" defaultValue={32} />
                </div>
                <Button variant="secondary">Preview 5s render</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Caption segments</CardTitle>
                <CardDescription>Quick edits before render.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {subtitleSegments.map((segment) => (
                  <div key={segment.id} className="space-y-2">
                    <label className="text-xs font-semibold">Segment {segment.id}</label>
                    <Textarea defaultValue={segment.text} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Live logs</CardTitle>
              <CardDescription>Auto tailing while the job runs.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl border bg-muted/30 p-4 font-mono text-xs text-muted-foreground">
                {logs.map((line, index) => (
                  <div key={`${line}-${index}`}>{line}</div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary">Open Logs</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Job logs</DialogTitle>
                  </DialogHeader>
                  <div className="max-h-[400px] overflow-auto rounded-2xl border bg-muted/30 p-4 font-mono text-xs text-muted-foreground">
                    {logs.map((line, index) => (
                      <div key={`${line}-dialog-${index}`}>{line}</div>
                    ))}
                  </div>
                  <DialogFooter>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        navigator.clipboard.writeText(logs.join("\n"));
                        pushToast({ title: "Logs copied" });
                      }}
                    >
                      <Copy className="h-4 w-4" />
                      Copy
                    </Button>
                    <Button
                      onClick={() =>
                        pushToast({ title: "Logs exported", description: "Saved to /exports." })
                      }
                    >
                      Download
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button
                variant="ghost"
                onClick={() => {
                  navigator.clipboard.writeText(logs.join("\n"));
                  pushToast({ title: "Logs copied" });
                }}
              >
                <Copy className="h-4 w-4" />
                Copy logs
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
