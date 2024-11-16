export const calcularPagina = (
  pagina: string | number,
  limit: number = 5 // Valor por defecto, pero ahora configurable
) => {
  const currentPage = Math.max(Number(pagina) || 1, 1); // Si `pagina` no es un número válido, se usa 1
  const skip = (currentPage - 1) * limit;

  return { skip, porPagina: limit };
};
