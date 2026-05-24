/** Public Instagram profile — used in contact, footer, and structured data. */
export const INSTAGRAM_URL = "https://www.instagram.com/simon__saad/";
export const INSTAGRAM_HANDLE = "@simon__saad";

/**
 * WhatsApp wa.me number: digits only, country code first (e.g. 491701234567).
 * Set when available; null keeps the contact link as non-clickable TODO text.
 */
export const WHATSAPP_WA_ME_NUMBER = "4915757826315";

export const WHATSAPP_DISPLAY_NUMBER = "+49 1575 7826315";

export function buildWhatsAppUrl(number: string | null = WHATSAPP_WA_ME_NUMBER): string | null {
  if (!number) return null;
  return `https://wa.me/${number}`;
}

export const SITE_NAME = "Simon Saad Visuals";

/** Default Open Graph image (1200×630 SVG). Replace with a raster OG asset when available. */
export const DEFAULT_OG_IMAGE_PATH = "/og/og-default.svg";
