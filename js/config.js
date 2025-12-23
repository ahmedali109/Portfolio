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

// JSON Data Cache
const jsonCache = new Map();

/**
 * Fetch JSON data with caching
 * @param {string} url - The URL to fetch (can use getPath())
 * @returns {Promise<any>} The JSON data
 */
export async function fetchJSON(url) {
  // Check if data is already cached
  if (jsonCache.has(url)) {
    return jsonCache.get(url);
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Store in cache
    jsonCache.set(url, data);

    return data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
}

/**
 * Clear cache for a specific URL or all cache
 * @param {string} [url] - Optional URL to clear, clears all if not provided
 */
export function clearCache(url) {
  if (url) {
    jsonCache.delete(url);
  } else {
    jsonCache.clear();
  }
}
