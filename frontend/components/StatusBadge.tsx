import { Badge } from "@/components/ui/badge";

const statusMap = {
  queued: { label: "Queued", variant: "secondary" },
  running: { label: "Running", variant: "warning" },
  failed: { label: "Failed", variant: "destructive" },
  done: { label: "Done", variant: "success" },
};

export type JobStatus = keyof typeof statusMap;

export function StatusBadge({ status }: { status: JobStatus }) {
  const current = statusMap[status];
  return <Badge variant={current.variant as never}>{current.label}</Badge>;
}
