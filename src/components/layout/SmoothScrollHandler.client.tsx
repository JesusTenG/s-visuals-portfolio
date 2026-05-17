"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getScrollBehavior(): ScrollBehavior {
  return prefersReducedMotion() ? "auto" : "smooth";
}

function scrollToHashId(id: string): boolean {
  const target = document.getElementById(id);
  if (!target) return false;
  target.scrollIntoView({ behavior: getScrollBehavior(), block: "start" });
  return true;
}

function scrollToLocationHash(): void {
  const { hash } = window.location;
  if (!hash || hash === "#") return;
  const id = decodeURIComponent(hash.slice(1));
  if (!id) return;
  requestAnimationFrame(() => {
    scrollToHashId(id);
  });
}

function handleDocumentClick(event: MouseEvent): void {
  if (event.defaultPrevented) return;
  if (event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const anchor = (event.target as Element | null)?.closest("a[href]");
  if (!anchor) return;

  const rawHref = anchor.getAttribute("href");
  if (!rawHref || rawHref.startsWith("mailto:") || rawHref.startsWith("tel:")) return;

  let url: URL;
  try {
    url = new URL(rawHref, window.location.href);
  } catch {
    return;
  }

  if (url.origin !== window.location.origin) return;
  if (!url.hash || url.hash === "#") return;

  const id = decodeURIComponent(url.hash.slice(1));
  if (!id) return;

  const sameDocument =
    url.pathname === window.location.pathname && url.search === window.location.search;

  if (!sameDocument) return;

  const target = document.getElementById(id);
  if (!target) return;

  event.preventDefault();
  scrollToHashId(id);
  window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
}

export function SmoothScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick, true);
    return () => document.removeEventListener("click", handleDocumentClick, true);
  }, []);

  useEffect(() => {
    const run = () => scrollToLocationHash();

    run();
    const raf = requestAnimationFrame(run);
    const timeout = window.setTimeout(run, 80);
    window.addEventListener("hashchange", run);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
      window.removeEventListener("hashchange", run);
    };
  }, [pathname]);

  return null;
}
