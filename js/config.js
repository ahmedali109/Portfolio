// Configuration for GitHub Pages deployment
// Change this to your repository name if different
export const BASE_PATH =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "" // Local development
    : "/Portfolio"; // GitHub Pages

export function getPath(path) {
  // Remove leading slash if present and add base path
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${BASE_PATH}/${cleanPath}`.replace(/\/+/g, "/");
}
