export function validateFileListSize(files: FileList): boolean {
  const totalSize = getTotalFileListSize(files);
  return totalSize <= 4000000; // 4 MB
}

function getTotalFileListSize(files: FileList): number {
  return Array.from(files).reduce((total, file) => total + (file.size || 0), 0);
}


// Servidor: Maneja solo File[]
export function validateFileSizeServer(files: File[]): boolean {
  const totalSize = getTotalFileSizeServer(files);
  return totalSize <= 4000000; // 4 MB
}

function getTotalFileSizeServer(files: File[]): number {
  return files.reduce((total, file) => total + (file.size || 0), 0);
}
