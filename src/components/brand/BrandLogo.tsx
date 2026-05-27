import Image from "next/image";

import { BRAND_LOGO_SRC } from "@/lib/site";

type Props = Readonly<{
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}>;

/** Same asset as Navbar (`BRAND_LOGO_SRC` / logo1.png). */
export function BrandLogo({
  className,
  width = 172,
  height = 46,
  priority = false,
}: Props) {
  return (
    <Image
      src={BRAND_LOGO_SRC}
      alt=""
      width={width}
      height={height}
      className={className}
      priority={priority}
      unoptimized
    />
  );
}
