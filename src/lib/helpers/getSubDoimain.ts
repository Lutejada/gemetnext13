export const getSubdomain = () => {
  // Asegúrate de estar en el lado del cliente antes de acceder a window
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    return hostname.split(".")[0];
  }
  return null;
};
