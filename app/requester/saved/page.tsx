import { Bookmark, Search } from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/dashboard/PageHeader";

const MOCK_SAVED = [
  {
    id: "2",
    fabric_type: "Cotton",
    quantity: "8kg",
    description: "White and off-white cotton offcuts from a garment factory.",
    location: "Yaba, Lagos",
  },
  {
    id: "5",
    fabric_type: "Silk",
    quantity: "2kg",
    description: "Silk blend scraps from a bridal atelier.",
    location: "Lekki, Lagos",
  },
  {
    id: "7",
    fabric_type: "Wool",
    quantity: "4kg",
    description: "Heavyweight wool offcuts, ideal for outerwear.",
    location: "Ikoyi, Lagos",
  },
];

export default function SavedPage() {
  return (
    <div>
      <PageHeader
        title="Saved Materials"
        description="Materials you have bookmarked for later."
        action={
          <Link
            href="/requester/browse"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground
                       px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-hover
                       transition-colors"
          >
            <Search size={14} />
            Browse More
          </Link>
        }
      />

      {MOCK_SAVED.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
            <Bookmark size={20} className="text-foreground-muted" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-display text-lg text-foreground">
              Nothing saved yet.
            </p>
            <p className="text-sm text-foreground-muted">
              Browse materials and save the ones you want to come back to.
            </p>
          </div>
          <Link
            href="/requester/browse"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground
                       px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-hover
                       transition-colors"
          >
            Browse Materials
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_SAVED.map((item) => (
            <div
              key={item.id}
              className="flex flex-col bg-card border border-border rounded-2xl overflow-hidden"
            >
              <div className="h-36 bg-background-subtle flex items-center justify-center border-b border-border">
                <Bookmark size={24} className="text-border" />
              </div>
              <div className="p-4 flex flex-col gap-2">
                <span className="text-xs font-medium tracking-widest uppercase text-foreground-muted">
                  {item.fabric_type}
                </span>
                <p className="text-sm text-foreground line-clamp-2 leading-snug">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-medium text-foreground">
                    {item.quantity}
                  </span>
                  <span className="text-xs text-foreground-muted">
                    {item.location}
                  </span>
                </div>
                <div className="flex gap-2 mt-2 pt-3 border-t border-border">
                  <Link
                    href={`/requester/browse/${item.id}`}
                    className="flex-1 text-center text-xs bg-primary text-primary-foreground
                               py-2 rounded-xl font-medium hover:bg-primary-hover transition-colors"
                  >
                    Request
                  </Link>
                  <button
                    className="flex-1 text-center text-xs border border-border text-foreground-muted
                               py-2 rounded-xl font-medium hover:bg-muted transition-colors"
                  >
                    Unsave
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
