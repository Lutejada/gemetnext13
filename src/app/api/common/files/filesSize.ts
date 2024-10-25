export function validateFileSize(files: FileList | File[]): boolean {
  const totalSize = getTotalFileSize(files);
  return totalSize <= 4000000; // 4 MB
}

function getTotalFileSize(files: FileList | File[]): number {
  if (files instanceof FileList) {
    // Convertir FileList a un array
    return Array.from(files).reduce(
      (total, file) => total + (file.size || 0),
      0
    );
  } else if (Array.isArray(files)) {
    return files.reduce((total, file) => total + (file.size || 0), 0);
  }
  return 0; // En caso de que no sea ni FileList ni File[]
}
