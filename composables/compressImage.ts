import imageCompression from "browser-image-compression";

export const useCompressImage = async (event: any) => {
  const targetSizeBytes = 150 * 1024;
  const value = event.target.files[0];
  const options = {
    maxSizeMB: 0.1465,
    useWebWorker: true,
  };
  let compressedFile = value;
  if (value?.size > targetSizeBytes) {
    try {
      compressedFile = await imageCompression(value, options);
      console.log("Original file size:", (value.size / 1024).toFixed(2), "KB");
      console.log(
        "Compressed file size:",
        (compressedFile.size / 1024).toFixed(2),
        "KB",
      );
    } catch (error) {
      console.error("Compression error:", error);
    }
  }
  return compressedFile;
};
