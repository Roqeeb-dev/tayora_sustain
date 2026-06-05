type Status =
  | "pending"
  | "approved"
  | "matched"
  | "collected"
  | "delivered"
  | "rejected";

const CONFIG: Record<Status, { label: string; classes: string }> = {
  pending: { label: "Pending", classes: "bg-warning/10 text-warning" },
  approved: { label: "Approved", classes: "bg-success/10 text-success" },
  matched: { label: "Matched", classes: "bg-blue-100 text-blue-700" },
  collected: { label: "Collected", classes: "bg-primary/10 text-primary" },
  delivered: { label: "Delivered", classes: "bg-purple-100 text-purple-700" },
  rejected: {
    label: "Rejected",
    classes: "bg-destructive/10 text-destructive",
  },
};

export default function StatusBadge({ status }: { status: Status }) {
  const { label, classes } = CONFIG[status];
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${classes}`}>
      {label}
    </span>
  );
}
