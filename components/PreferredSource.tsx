"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import {
  PREFERRED_SOURCE_BRAND,
  PREFERRED_SOURCE_DEEPLINK,
  addPreferredSourceOrDeeplink,
  dismissPreferredSource,
  isPreferredSourceDismissed,
  isPreferredSourcePrivatePath,
  loadPreferredSourceClient,
} from "@/lib/preferred-source";

/** Official four-color Google G. Brand lockup, not a generic icon. */
function GoogleG({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export function PreferredSourceFooterLink() {
  const pathname = usePathname();
  if (isPreferredSourcePrivatePath(pathname)) return null;

  return (
    <a
      className="ps-footer"
      href={PREFERRED_SOURCE_DEEPLINK}
      target="_blank"
      rel="noopener noreferrer"
    >
      <GoogleG size={16} />
      Add as preferred source on Google
    </a>
  );
}

export function PreferredSourceChip() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const privatePath = isPreferredSourcePrivatePath(pathname);

  useEffect(() => {
    if (privatePath || isPreferredSourceDismissed()) {
      setOpen(false);
      return;
    }

    const timer = window.setTimeout(() => setOpen(true), 2_000);
    return () => window.clearTimeout(timer);
  }, [privatePath]);

  useEffect(() => {
    if (!open || typeof window === "undefined") return;
    if (window.location.hostname.replace(/^www\./, "") !== "flostudios.ai") return;
    void loadPreferredSourceClient();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      dismissPreferredSource();
      setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (privatePath || !open) return null;

  const hide = () => {
    dismissPreferredSource();
    setOpen(false);
  };

  const onAdd = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    hide();
    void addPreferredSourceOrDeeplink();
  };

  return (
    <aside
      className="ps-chip"
      aria-label={`Add ${PREFERRED_SOURCE_BRAND} as a preferred source on Google`}
    >
      <button className="ps-chip-close" type="button" aria-label="Dismiss" onClick={hide}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>
      <p className="ps-chip-copy">
        See {PREFERRED_SOURCE_BRAND} <span>more often</span> on Google
      </p>
      <a
        className="ps-chip-btn"
        href={PREFERRED_SOURCE_DEEPLINK}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onAdd}
      >
        <GoogleG size={15} />
        Add on Google
      </a>
    </aside>
  );
}
