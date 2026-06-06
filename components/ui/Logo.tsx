import Image from "next/image";
import Link from "next/link";
import logoImg from "@/public/tayora_logo.png";

interface LogoProps {
  href?: string;
  size?: "sm" | "md" | "lg";
  invert?: boolean;
}

const SIZE_MAP = {
  sm: { width: 80, height: 24 },
  md: { width: 110, height: 32 },
  lg: { width: 140, height: 40 },
};

export default function Logo({
  href = "/",
  size = "md",
  invert = false,
}: LogoProps) {
  const { width, height } = SIZE_MAP[size];

  const image = (
    <Image
      src={logoImg}
      alt="Tayora Sustain"
      width={width}
      height={height}
      priority
      className={`shrink-0 object-contain ${invert ? "invert brightness-200" : ""}`}
    />
  );

  if (!href) return image;

  return (
    <Link href={href} className="flex items-center w-fit">
      {image}
    </Link>
  );
}
