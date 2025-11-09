export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};

export const getFileTypeIcon = (type: string): string => {
  if (type.startsWith("image/")) return "🖼️";
  if (type.startsWith("video/")) return "🎥";
  if (type.startsWith("audio/")) return "🎵";
  if (type.includes("pdf")) return "📄";
  if (type.includes("word")) return "📝";
  if (type.includes("excel") || type.includes("sheet")) return "📊";
  return "📁";
};

export const validateFileType = (file: File, accept?: string): boolean => {
  if (!accept) return true;

  const acceptedTypes = accept.split(",").map((type) => type.trim());

  return acceptedTypes.some((acceptedType) => {
    if (acceptedType.startsWith(".")) {
      // File extension
      return file.name.toLowerCase().endsWith(acceptedType.toLowerCase());
    } else {
      // MIME type
      if (acceptedType.endsWith("/*")) {
        return file.type.startsWith(acceptedType.slice(0, -1));
      }
      return file.type === acceptedType;
    }
  });
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export const createImagePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("File is not an image"));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
