"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";

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
import { useToast } from "@/components/ToastProvider";

export default function SettingsPage() {
  const { pushToast } = useToast();
  const [loading, setLoading] = React.useState(false);

  const handleDisconnect = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setLoading(false);
    pushToast({ title: "Disconnected", description: "OAuth token revoked." });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage integrations and performance preferences.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>YouTube OAuth</CardTitle>
            <CardDescription>Connect a channel for uploads.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border bg-muted/30 p-4 text-sm">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Token active • creator@smartclip.io
            </div>
            <Button
              onClick={() =>
                pushToast({ title: "Connected", description: "YouTube OAuth ready." })
              }
            >
              Connect YouTube
            </Button>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" isLoading={loading} onClick={handleDisconnect}>
              Disconnect
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Processing</CardTitle>
            <CardDescription>Fine tune your pipeline.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold">Whisper model</label>
              <Select defaultValue="medium">
                <option value="small">Small (fast)</option>
                <option value="medium">Medium (balanced)</option>
                <option value="large">Large (accurate)</option>
              </Select>
            </div>
            <div className="rounded-2xl border bg-muted/30 p-4 text-sm">
              GPU detected • NVIDIA RTX 3060
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold">Max concurrent workers</label>
              <Input type="number" defaultValue={3} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Storage</CardTitle>
            <CardDescription>Keep the VPS clean and predictable.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold">Auto cleanup after (days)</label>
              <Input type="number" defaultValue={7} />
              <p className="text-xs text-muted-foreground">
                Older jobs will be archived to /archives.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="secondary"
              onClick={() => pushToast({ title: "Settings saved" })}
            >
              Save storage settings
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
