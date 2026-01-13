"use client";

import * as React from "react";
import { Copy, Download, UploadCloud } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { useToast } from "@/components/ToastProvider";

export interface ClipItem {
  id: string;
  title: string;
  caption: string;
  score: number;
  tags: string[];
  thumbnail: string;
  video: string;
  breakdown: string;
}

export function ClipCard({ clip }: { clip: ClipItem }) {
  const { pushToast } = useToast();
  const [title, setTitle] = React.useState(clip.title);
  const [caption, setCaption] = React.useState(clip.caption);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>{clip.id}</CardTitle>
            <CardDescription>Rendered 1080x1920 • 12s</CardDescription>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <button className="rounded-full border px-3 py-1 text-xs font-semibold text-primary">
                Viral Score {clip.score}
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <p className="font-semibold">Viral Score Breakdown</p>
              <p className="mt-2 text-xs text-muted-foreground">{clip.breakdown}</p>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-[180px_1fr]">
          <div className="space-y-3">
            <video
              className="h-40 w-full rounded-2xl border object-cover"
              src={clip.video}
              controls
            />
            <img
              className="h-24 w-full rounded-2xl border object-cover"
              src={clip.thumbnail}
              alt="Clip thumbnail"
            />
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold">Title</label>
              <Input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold">Caption</label>
              <Textarea
                value={caption}
                onChange={(event) => setCaption(event.target.value)}
                className="min-h-[120px]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold">Tags</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {clip.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            onClick={() => pushToast({ title: "Download started", description: title })}
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button
            variant="ghost"
            onClick={() => pushToast({ title: "Uploaded to queue", description: title })}
          >
            <UploadCloud className="h-4 w-4" />
            Upload
          </Button>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost">Edit metadata</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit clip metadata</DialogTitle>
                <DialogDescription>
                  Update title and caption for publishing.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold">Title</label>
                  <Input
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold">Caption</label>
                  <Textarea
                    value={caption}
                    onChange={(event) => setCaption(event.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="secondary">Cancel</Button>
                <Button
                  onClick={() =>
                    pushToast({
                      title: "Metadata saved",
                      description: "Clip details updated successfully.",
                    })
                  }
                >
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            variant="ghost"
            onClick={() => pushToast({ title: "Settings duplicated" })}
          >
            <Copy className="h-4 w-4" />
            Duplicate
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
