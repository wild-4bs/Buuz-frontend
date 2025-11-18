export const validateImageFile = (
  file: File,
  onResult: (message: string, imageSrc?: string) => void
) => {
  if (!file) {
    onResult("No file selected.");
    return;
  }

  const maxSize = 10 * 1024 * 1024; // 10MB in bytes

  if (!file.type.startsWith("image/")) {
    onResult("This file is not an image.");
    return;
  }

  if (file.size > maxSize) {
    onResult("Image size exceeds 10MB.");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    onResult("Image selected.", reader.result as string);
  };
  reader.onerror = () => {
    onResult("Error reading the image file.");
  };

  reader.readAsDataURL(file);
};
