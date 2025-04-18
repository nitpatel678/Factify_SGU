// urlExtractionService.js

/**
 * Enhanced URL content extraction service
 * Extracts text content, claims, and metadata from URLs
 */

// Use LinkPreview API as a fallback for better URL handling
const LINK_PREVIEW_API_KEY = "85f2e1f697c8f8fca0d6c2054a6895ae"; // Replace with actual key
// urlExtractionService.js

/**
 * Extract content from a URL using multiple methods
 * @param {string} url - The URL to extract content from
 * @returns {Promise<Object>} - Extracted content data
 */
export const extractUrlContent = async (url) => {
  try {
    const directExtraction = await extractWithCorsProxy(url);

    if (!directExtraction.claim || directExtraction.fullContent.length < 100) {
      const linkPreviewData = await extractWithLinkPreviewApi(url);
      return {
        fullContent: directExtraction.fullContent.length > linkPreviewData.fullContent.length
          ? directExtraction.fullContent
          : linkPreviewData.fullContent,
        claim: directExtraction.claim || linkPreviewData.claim,
        title: directExtraction.title || linkPreviewData.title,
        url: url,
        imageUrl: linkPreviewData.imageUrl || null
      };
    }

    return directExtraction;
  } catch (error) {
    console.error("Error extracting URL content:", error);
    try {
      return await extractWithLinkPreviewApi(url);
    } catch (fallbackError) {
      console.error("Fallback extraction also failed:", fallbackError);
      return {
        fullContent: "Failed to extract content from URL. Please copy and paste the text directly.",
        claim: "",
        title: "",
        url: url,
        imageUrl: null
      };
    }
  }
};

/**
 * Extract content using CORS proxy
 */
const extractWithCorsProxy = async (url) => {
  const corsProxy = "https://corsproxy.io/?";
  const response = await fetch(corsProxy + encodeURIComponent(url));
  const html = await response.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const title = doc.querySelector("title")?.textContent ||
    doc.querySelector("h1")?.textContent || "";

  const metaDescription = doc.querySelector('meta[name="description"]')?.getAttribute("content") ||
    doc.querySelector('meta[property="og:description"]')?.getAttribute("content") || "";

  const metaImage = doc.querySelector('meta[property="og:image"]')?.getAttribute("content") ||
    doc.querySelector('meta[name="twitter:image"]')?.getAttribute("content") || "";

  const claimFromUrl = extractClaimFromUrl(url);
  const content = extractMainContent(doc);
  const extractedClaim = generateClaim(claimFromUrl, metaDescription, title, content);

  return {
    fullContent: title + ' ' + content,
    claim: extractedClaim,
    title: title,
    url: url,
    imageUrl: metaImage
  };
};

/**
 * Extract content using LinkPreview API
 */
const extractWithLinkPreviewApi = async (url) => {
  const apiUrl = `https://api.linkpreview.net/?key=${LINK_PREVIEW_API_KEY}&q=${encodeURIComponent(url)}`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  if (!response.ok) {
    throw new Error("LinkPreview API error");
  }

  return {
    fullContent: data.description || "",
    claim: data.description || "",
    title: data.title || "",
    url: url,
    imageUrl: data.image || null
  };
};

/**
 * Extract claim from URL structure
 */
const extractClaimFromUrl = (url) => {
  let claimFromUrl = "";

  if (url.includes(".com/") || url.includes(".org/") || url.includes(".net/")) {
    const urlPath = new URL(url).pathname;
    const segments = urlPath.split("/").filter((segment) => segment.length > 0);

    if (segments.length > 1) {
      const potentialClaim = segments
        .filter((segment) => segment.length > 3 && !segment.match(/^\d+$/))
        .join(" ")
        .replace(/-/g, " ");

      if (potentialClaim.length > 10) {
        claimFromUrl = potentialClaim;
      }
    }
  }

  return claimFromUrl;
};

/**
 * Extract main content from HTML document
 */
const extractMainContent = (doc) => {
  let content = "";

  const articleSelectors = [
    "article", ".article-content", ".post-content",
    "main", ".content", "#content", ".story", ".news-content"
  ];

  for (const selector of articleSelectors) {
    const element = doc.querySelector(selector);
    if (element) {
      const text = element.textContent.trim().replace(/\s+/g, " ");
      if (text.length > content.length) {
        content = text;
      }
    }
  }

  if (!content) {
    const paragraphs = doc.querySelectorAll("p");
    let pText = "";
    for (let i = 0; i < Math.min(paragraphs.length, 10); i++) {
      const text = paragraphs[i].textContent.trim();
      if (text.length > 30) {
        pText += text + " ";
      }
    }
    content = pText;
  }

  if (!content && doc.body) {
    content = doc.body.textContent.trim().replace(/\s+/g, " ").substring(0, 2000);
  }

  return content;
};

/**
 * Generate a concise claim from available data
 */
const generateClaim = (claimFromUrl, metaDescription, title, content) => {
  let extractedClaim = "";

  if (claimFromUrl.length > 10) {
    extractedClaim = claimFromUrl;
  } else if (metaDescription.length > 10) {
    extractedClaim = metaDescription;
  } else if (title.length > 10) {
    extractedClaim = title;
  } else if (content.length > 0) {
    const snippet = content.substring(0, Math.min(200, content.length));
    const sentences = snippet.match(/[^.!?]+[.!?]+/g) || [snippet];
    extractedClaim = sentences[0].trim();
  }

  return extractedClaim;
};
