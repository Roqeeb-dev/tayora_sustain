// src/app/requester/browse/page.tsx
"use client";

import { useState } from "react";
import { Search, MapPin, Package, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";

// Mock until materials service exists
const FABRIC_TYPES = [
  "All",
  "Cotton",
  "Denim",
  "Ankara",
  "Linen",
  "Silk",
  "Polyester",
  "Wool",
  "Mixed",
];

const MOCK_MATERIALS = [
  {
    id: "1",
    fabric_type: "Ankara",
    quantity: "5kg",
    description: "Assorted ankara prints in good condition, vibrant colours.",
    location: "Ikeja, Lagos",
    status: "available",
  },
  {
    id: "2",
    fabric_type: "Cotton",
    quantity: "8kg",
    description: "White and off-white cotton offcuts from a garment factory.",
    location: "Yaba, Lagos",
    status: "available",
  },
  {
    id: "3",
    fabric_type: "Denim",
    quantity: "3kg",
    description: "Mixed denim remnants, various weights and washes.",
    location: "Surulere, Lagos",
    status: "available",
  },
  {
    id: "4",
    fabric_type: "Linen",
    quantity: "6kg",
    description: "Natural linen blend offcuts, perfect for summer pieces.",
    location: "VI, Lagos",
    status: "available",
  },
  {
    id: "5",
    fabric_type: "Silk",
    quantity: "2kg",
    description: "Silk blend scraps from a bridal atelier.",
    location: "Lekki, Lagos",
    status: "available",
  },
  {
    id: "6",
    fabric_type: "Mixed",
    quantity: "10kg",
    description: "Assorted fabric remnants from multiple suppliers.",
    location: "Oshodi, Lagos",
    status: "available",
  },
  {
    id: "7",
    fabric_type: "Wool",
    quantity: "4kg",
    description: "Heavyweight wool offcuts, ideal for outerwear.",
    location: "Ikoyi, Lagos",
    status: "available",
  },
  {
    id: "8",
    fabric_type: "Cotton",
    quantity: "7kg",
    description: "Printed cotton remnants from a children's wear brand.",
    location: "Agege, Lagos",
    status: "available",
  },
];

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [showFilter, setShowFilter] = useState(false);

  const filtered = MOCK_MATERIALS.filter((m) => {
    const matchesType = activeType === "All" || m.fabric_type === activeType;
    const matchesSearch =
      m.description.toLowerCase().includes(search.toLowerCase()) ||
      m.fabric_type.toLowerCase().includes(search.toLowerCase()) ||
      m.location.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl text-foreground">
            Browse Materials
          </h1>
          <p className="text-sm text-foreground-muted mt-0.5">
            {filtered.length} material{filtered.length !== 1 ? "s" : ""}{" "}
            available
          </p>
        </div>
      </div>

      {/* Search + filter bar */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted"
          />
          <input
            type="text"
            placeholder="Search by fabric, description or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-xl border border-border bg-card
                       text-sm text-foreground placeholder:text-foreground-muted/60
                       outline-none focus:ring-2 focus:ring-primary/20 focus:border-input-focus
                       transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilter((p) => !p)}
          className={`h-10 px-4 rounded-xl border text-sm font-medium flex items-center gap-2
                      transition-colors
                      ${
                        showFilter
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border text-foreground-muted hover:text-foreground"
                      }`}
        >
          <SlidersHorizontal size={14} />
          Filter
        </button>
      </div>

      {/* Fabric type filter pills */}
      {showFilter && (
        <div className="flex flex-wrap gap-2 mb-6 p-4 bg-card border border-border rounded-2xl">
          {FABRIC_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-3.5 py-1.5 rounded-xl text-sm border transition-all duration-150
                          ${
                            activeType === type
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background text-foreground-muted border-border hover:border-primary/40 hover:text-foreground"
                          }`}
            >
              {type}
            </button>
          ))}
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
            <Package size={20} className="text-foreground-muted" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-display text-lg text-foreground">
              No materials found.
            </p>
            <p className="text-sm text-foreground-muted">
              Try adjusting your search or filter.
            </p>
          </div>
          <button
            onClick={() => {
              setSearch("");
              setActiveType("All");
            }}
            className="text-sm text-accent hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Grid */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((material) => (
            <Link
              key={material.id}
              href={`/requester/browse/${material.id}`}
              className="group flex flex-col bg-card border border-border rounded-2xl
                         overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5
                         transition-all duration-200"
            >
              {/* Image placeholder */}
              <div className="h-36 bg-background-subtle flex items-center justify-center border-b border-border">
                <Package size={28} className="text-border" />
              </div>

              <div className="p-4 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <span
                    className="text-xs font-medium tracking-widest uppercase
                                   text-foreground-muted"
                  >
                    {material.fabric_type}
                  </span>
                  <span
                    className="text-xs bg-success/10 text-success px-2 py-0.5
                                   rounded-full font-medium shrink-0"
                  >
                    Available
                  </span>
                </div>
                <p className="text-sm text-foreground line-clamp-2 leading-snug">
                  {material.description}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-medium text-foreground">
                    {material.quantity}
                  </span>
                  <div className="flex items-center gap-1">
                    <MapPin size={11} className="text-foreground-muted" />
                    <span className="text-xs text-foreground-muted">
                      {material.location}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
