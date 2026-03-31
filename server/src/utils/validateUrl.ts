// NOTE: This logic is duplicated intentionally.
// Client: for quick validation (UX)
// Server: for final validation (source of truth)

export const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);

    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
};
