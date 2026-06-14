"use client";

import { useState } from "react";
import Image from "next/image";

import laptopBag from "@/public/laptop-bag.jpeg";
import slippers from "@/public/fancy-slippers.jpeg";
import bag from "@/public/hand-bag.jpeg";
import scrunchies from "@/public/scrunchies.jpeg";

const WORKS = [
  {
    id: 1,
    image: scrunchies,
    category: "Accessories",
    title: "The Scrunchie Set",
    material: "Repurposed ankara & cotton offcuts",
    origin: "Lagos, Mainland",
    tag: "Upcycled",
  },
  {
    id: 2,
    image: slippers,
    category: "Footwear",
    title: "The Remnant Slides",
    material: "Reclaimed fabric straps on rubber sole",
    origin: "Surulere, Lagos",
    tag: "Upcycled",
  },
  {
    id: 3,
    image: laptopBag,
    category: "Bags",
    title: "The Carry Tote",
    material: "Deadstock canvas & linen blend",
    origin: "Ikeja, Lagos",
    tag: "Upcycled",
  },
  {
    id: 4,
    image: bag,
    category: "Bags",
    title: "The Market Bag",
    material: "Mixed woven fabric remnants",
    origin: "Yaba, Lagos",
    tag: "Upcycled",
  },
];

function WorkImage({
  src,
  alt,
  category,
}: {
  src: (typeof WORKS)[0]["image"];
  alt: string;
  category: string;
}) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-muted flex items-center justify-center">
        <span className="font-display text-6xl text-border select-none">
          {category[0]}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
      onError={() => setError(true)}
    />
  );
}

export default function Works() {
  return (
    <section
      id="products"
      className="bg-background-subtle py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-foreground-muted mb-5">
              <span className="w-8 h-px bg-accent" />
              The Work
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground leading-tight">
              Waste, made
              <br />
              <span className="text-accent">wearable.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-5">
          {/* Card 1 — tall, spans 2 rows */}
          <WorkCard
            work={WORKS[0]}
            className="lg:row-span-2"
            imageHeight="h-64 lg:h-full"
          />

          {/* Card 2 — top right */}
          <WorkCard work={WORKS[1]} imageHeight="h-52" />

          {/* Card 3 — top far right */}
          <WorkCard work={WORKS[2]} imageHeight="h-52" />

          {/* Card 4 — bottom, spans 2 columns */}
          <WorkCard
            work={WORKS[3]}
            className="sm:col-span-2 lg:col-span-2"
            imageHeight="h-52"
            horizontal
          />
        </div>
      </div>
    </section>
  );
}

function WorkCard({
  work,
  className = "",
  imageHeight,
  horizontal = false,
}: {
  work: (typeof WORKS)[0];
  className?: string;
  imageHeight: string;
  horizontal?: boolean;
}) {
  return (
    <div
      className={`group flex bg-card border border-border rounded-2xl overflow-hidden
                  hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300
                  ${horizontal ? "flex-row" : "flex-col"}
                  ${className}`}
    >
      {/* Image */}
      <div
        className={`relative bg-muted overflow-hidden shrink-0
                    ${horizontal ? "w-2/5 h-auto" : `w-full ${imageHeight}`}`}
      >
        <WorkImage src={work.image} alt={work.title} category={work.category} />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />

        {/* Tag */}
        <span className="absolute top-3 left-3 text-xs font-medium bg-primary text-primary-foreground px-2.5 py-1 rounded-full z-10">
          {work.tag}
        </span>
      </div>

      {/* Details */}
      <div
        className={`flex flex-col gap-1.5 p-4 border-border
                    ${horizontal ? "border-l justify-center" : "border-t"}`}
      >
        <span className="text-xs text-foreground-muted tracking-widest uppercase font-medium">
          {work.category}
        </span>
        <h3 className="font-display text-lg text-foreground leading-tight">
          {work.title}
        </h3>
        <p className="text-xs text-foreground-muted">{work.material}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="w-1 h-1 rounded-full bg-accent" />
          <span className="text-xs text-foreground-muted">{work.origin}</span>
        </div>
      </div>
    </div>
  );
}
