/**
 * Flora Pharmacy - Client-side High-Efficiency Image Compressor & Sanitizer
 * Resizes large camera photos (up to 30MB) into lightweight, high-fidelity
 * base64 WebP/JPEG data URLs (~20KB-40KB) suitable for localStorage & Firestore.
 */

export async function compressImage(file, maxWidth = 600, maxHeight = 600, quality = 0.75) {
  if (!file) return "";

  // If it's an SVG, read safely as data URL
  if (file.type === "image/svg+xml") {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error("Invalid image format"));
      img.onload = () => {
        let width = img.naturalWidth || img.width || 400;
        let height = img.naturalHeight || img.height || 400;

        // Calculate aspect-ratio-preserving dimensions
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.max(10, Math.round(width * ratio));
          height = Math.max(10, Math.round(height * ratio));
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          resolve(e.target.result);
          return;
        }

        // Crisp white studio background for packshots
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // High quality downsampling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Try WebP first for ultra-lightweight size (~20KB), fallback to JPEG
        try {
          const webpDataUrl = canvas.toDataURL("image/webp", quality);
          if (webpDataUrl.startsWith("data:image/webp")) {
            resolve(webpDataUrl);
            return;
          }
        } catch (err) {}

        try {
          const jpegDataUrl = canvas.toDataURL("image/jpeg", quality);
          resolve(jpegDataUrl);
        } catch (err) {
          resolve(e.target.result);
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Sanitizes and cleans an image URL string
 */
export function sanitizeImageUrl(url) {
  if (!url || typeof url !== "string") return "";
  let clean = url.trim().replace(/^["']|["']$/g, "");
  if (!clean) return "";

  // Data URLs, root-relative paths, and blob URLs are valid as-is
  if (clean.startsWith("data:image/") || clean.startsWith("/") || clean.startsWith("blob:")) {
    return clean;
  }

  // Handle protocol-relative URLs
  if (clean.startsWith("//")) {
    return "https:" + clean;
  }

  // Handle www. or missing https://
  if (clean.startsWith("www.")) {
    return "https://" + clean;
  }

  // If user pasted bare domain link (e.g. images.com/img.jpg)
  if (!clean.startsWith("http://") && !clean.startsWith("https://")) {
    if (clean.includes(".") && clean.includes("/")) {
      return "https://" + clean;
    }
  }

  return clean;
}
