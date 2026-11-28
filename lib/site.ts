/**
 * Shared site facts used by metadata, JSON-LD and components, so URLs and
 * dates stay consistent in one place.
 */

export const SITE_URL = "https://www.flostudios.ai";

/** Bump this when the homepage content meaningfully changes (sitemap lastmod + JSON-LD dateModified). */
export const CONTENT_UPDATED = "2026-07-29";

export const PARENT_ORG = {
  name: "FloLabs Innovations Group",
  url: "https://www.flolabsinnovations.com/",
};

/** Social profiles linked in the footer. They belong to the parent, FloLabs Innovations Group. */
export const SOCIAL_URLS = {
  youtube: "https://www.youtube.com/@flolabsinnovation",
  linkedin: "https://www.linkedin.com/company/flolabs-innovation/",
  facebook: "https://www.facebook.com/people/Flo-Labs-RD/61572285432918/",
  instagram: "https://www.instagram.com/flolabsinnovations/",
  tiktok: "https://www.tiktok.com/@flomadlabs",
  reddit: "https://www.reddit.com/user/FloLabs_Innovations/",
} as const;
