// Helper to get correct asset path with base URL for GitHub Pages deployment
export const getAssetPath = (path) => `${import.meta.env.BASE_URL}${path}`;
