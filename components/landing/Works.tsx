const WORKS = [
  {
    id: 1,
    image: "/images/works/tote-bag.jpg",
    category: "Accessories",
    title: "The Ankara Carry",
    material: "Repurposed ankara offcuts",
    origin: "Lagos, Mainland",
    tag: "Upcycled",
  },
  {
    id: 2,
    image: "/images/works/vest.jpg",
    category: "Apparel",
    title: "Patchwork Vest No. 3",
    material: "Mixed denim & cotton remnants",
    origin: "Surulere, Lagos",
    tag: "Upcycled",
  },
  {
    id: 3,
    image: "/images/works/clutch.jpg",
    category: "Accessories",
    title: "The Plaster Clutch",
    material: "Linen & silk blend offcuts",
    origin: "Ikeja, Lagos",
    tag: "Upcycled",
  },
  {
    id: 4,
    image: "/images/works/jacket.jpg",
    category: "Apparel",
    title: "The Remnant Jacket",
    material: "Deadstock suiting fabric",
    origin: "Yaba, Lagos",
    tag: "Upcycled",
  },
];

export default function Works() {
  return (
    <section className="bg-background-subtle py-24 lg:py-32 overflow-hidden">
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

        {/* Works grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WORKS.map((work, i) => (
            <div
              key={work.id}
              className={`group relative flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 ${
                i === 0 ? "lg:col-span-2 lg:row-span-1" : ""
              }`}
            >
              {/* Image */}
              <div
                className={`relative bg-muted overflow-hidden ${
                  i === 0 ? "h-72" : "h-56"
                }`}
              >
                {/* Placeholder texture when no image */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-muted flex items-center justify-center">
                  <span className="font-display text-6xl text-border select-none">
                    {work.category[0]}
                  </span>
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />

                {/* Tag */}
                <span className="absolute top-3 left-3 text-xs font-medium bg-primary text-primary-foreground px-2.5 py-1 rounded-full">
                  {work.tag}
                </span>
              </div>

              {/* Details */}
              <div className="flex flex-col gap-1.5 p-4 border-t border-border">
                <span className="text-xs text-foreground-muted tracking-widest uppercase font-medium">
                  {work.category}
                </span>
                <h3 className="font-display text-lg text-foreground leading-tight">
                  {work.title}
                </h3>
                <p className="text-xs text-foreground-muted">{work.material}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1 h-1 rounded-full bg-accent" />
                  <span className="text-xs text-foreground-muted">
                    {work.origin}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
