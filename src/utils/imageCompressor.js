/**
 * Flora Pharmacy - Client-side High-Efficiency Image Compressor
 * Resizes large camera photos (up to 25MB) into lightweight, high-fidelity
 * base64 WebP/JPEG data URLs (~35KB-60KB) suitable for localStorage & Firestore.
 */
export async function compressImage(file, maxWidth = 800, maxHeight = 800, quality = 0.82) {
  if (!file) return "";

  // If it's already a small SVG or non-image, handle safely
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
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error("Failed to load image"));
      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        // Calculate aspect-ratio-preserving dimensions
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, width);
        canvas.height = Math.max(1, height);
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          // Fallback to original data URL if canvas context unavailable
          resolve(e.target.result);
          return;
        }

        // Clean white background for transparent PNGs / product photos
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Smooth image downsampling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Export as JPEG with optimal compression
        try {
          const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
          resolve(compressedDataUrl);
        } catch (err) {
          // If browser restricts toDataURL, fallback safely
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

  // Data URLs and root-relative paths are valid as-is
  if (clean.startsWith("data:image/") || clean.startsWith("/")) {
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

  // If user pasted bare domain link (e.g. example.com/img.jpg)
  if (!clean.startsWith("http://") && !clean.startsWith("https://")) {
    if (clean.includes(".") && clean.includes("/")) {
      return "https://" + clean;
    }
  }

  return clean;
}

