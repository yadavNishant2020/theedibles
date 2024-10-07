export function getStrapiMedia(url) {
  // Check if URL is a local path
  if (url !== undefined && url.startsWith("/")) {
    // Prepend Strapi address
    const strapiUrl =
      process.env.GRIDSOME_STRAPI_URL || "http://139.59.6.114:1347";
    return strapiUrl + url;
  }
  // Otherwise return full URL
  return url;
}
