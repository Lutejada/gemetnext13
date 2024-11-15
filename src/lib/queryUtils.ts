export const calcularPagina = (
  pagina: string | number,
  porPagina: number = 5 // Valor por defecto, pero ahora configurable
) => {
  const currentPage = Math.max(Number(pagina) || 1, 1); // Si `pagina` no es un número válido, se usa 1
  const validPorPagina = Math.max(porPagina, 1); // Asegura que `porPagina` sea al menos 1
  const skip = (currentPage - 1) * validPorPagina;
  
  return { skip, porPagina: validPorPagina };
};
