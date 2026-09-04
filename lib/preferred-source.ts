const SITE_URL = "https://www.flostudios.ai/";
const SCRIPT_SRC = "https://news.google.com/swg/js/v1/publisher.js";
const LOAD_TIMEOUT_MS = 1600;
const DISMISS_MS = 30 * 24 * 60 * 60 * 1000;
const STORAGE_KEY = "flostudios.preferred-source.dismissed-at";
const RESET_KEY = "flostudios.preferred-source.reset-id";
const RESET_ID = "2026-09-04";

export const PREFERRED_SOURCE_BRAND = "FloStudios";
export const PREFERRED_SOURCE_DEEPLINK =
  `https://www.google.com/preferences/source?q=${encodeURIComponent(SITE_URL)}`;

function isProductionHost() {
  const host = window.location.hostname.replace(/^www\./, "");
  return host === "flostudios.ai";
}

const PRIVATE_PREFIXES = [
  "/internships",
  "/login",
  "/signin",
  "/signup",
  "/auth",
  "/account",
  "/admin",
  "/dashboard",
  "/hr",
];

type PreferredSourceTheme = "light" | "dark";

export type PreferredSourceClient = {
  init: (options: { theme?: PreferredSourceTheme; lang?: string }) => void;
  addPreferredSource: () => void;
};

declare global {
  interface Window {
    PREFERRED_SOURCE?:
      | Array<(client: PreferredSourceClient) => void>
      | PreferredSourceClient;
  }
}

let client: PreferredSourceClient | null = null;
let loadPromise: Promise<PreferredSourceClient | null> | null = null;

function currentTheme(): PreferredSourceTheme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function currentLang(): string {
  return document.documentElement.lang || "en";
}

function openDeeplink() {
  window.open(PREFERRED_SOURCE_DEEPLINK, "_blank", "noopener,noreferrer");
}

function subscribe(onReady: (preferredSource: PreferredSourceClient) => void) {
  const existing = window.PREFERRED_SOURCE;
  if (
    existing &&
    !Array.isArray(existing) &&
    typeof existing.addPreferredSource === "function"
  ) {
    onReady(existing);
    return;
  }

  const queue = Array.isArray(existing) ? existing : [];
  queue.push(onReady);
  window.PREFERRED_SOURCE = queue;
}

/** Loads publisher.js only after the chip is shown. Never call from the root layout. */
export function loadPreferredSourceClient(): Promise<PreferredSourceClient | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (client) return Promise.resolve(client);
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve) => {
    let settled = false;
    const finish = (value: PreferredSourceClient | null) => {
      if (settled) return;
      settled = true;
      resolve(value);
    };

    const timeout = window.setTimeout(() => finish(null), LOAD_TIMEOUT_MS);

    subscribe((preferredSource) => {
      preferredSource.init({ theme: currentTheme(), lang: currentLang() });
      client = preferredSource;
      window.clearTimeout(timeout);
      finish(preferredSource);
    });

    if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      const script = document.createElement("script");
      script.async = true;
      script.src = SCRIPT_SRC;
      script.setAttribute("preferred-sources-control", "manual");
      script.onerror = () => {
        window.clearTimeout(timeout);
        finish(null);
      };
      document.head.appendChild(script);
    }
  });

  return loadPromise;
}

export async function addPreferredSourceOrDeeplink() {
  if (typeof window === "undefined") return;

  // Google's JS always registers the current origin. Off production (localhost,
  // previews) that would add the local link, so use the flostudios.ai deeplink.
  if (!isProductionHost()) {
    openDeeplink();
    return;
  }

  if (client) {
    client.init({ theme: currentTheme(), lang: currentLang() });
    client.addPreferredSource();
    return;
  }

  const loaded = await Promise.race([
    loadPreferredSourceClient(),
    new Promise<null>((resolve) => {
      window.setTimeout(() => resolve(null), LOAD_TIMEOUT_MS);
    }),
  ]);

  if (loaded) {
    loaded.init({ theme: currentTheme(), lang: currentLang() });
    loaded.addPreferredSource();
    return;
  }

  openDeeplink();
}

export function isPreferredSourcePrivatePath(pathname: string | null) {
  if (!pathname) return false;
  const path = pathname.toLowerCase();
  return PRIVATE_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`),
  );
}

export function isPreferredSourceDismissed() {
  try {
    if (localStorage.getItem(RESET_KEY) !== RESET_ID) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(RESET_KEY, RESET_ID);
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const at = Number(raw);
    if (!Number.isFinite(at)) {
      localStorage.removeItem(STORAGE_KEY);
      return false;
    }
    return Date.now() - at < DISMISS_MS;
  } catch {
    return false;
  }
}

export function resetPreferredSourceDismiss() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* private mode / blocked storage */
  }
}

export function dismissPreferredSource() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    /* private mode / blocked storage */
  }
}
