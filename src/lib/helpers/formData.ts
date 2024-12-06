export const createFormData = <T extends Record<string, any>>(
  data: T
): FormData => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (value && key === "archivos") {
      for (const archivo of value) {
        formData.append("archivos", archivo);
      }
    } else if (value !== undefined && value !== null) {
      formData.append(key, value as string);
    }
  }

  return formData;
};

export function formDataToDto<T>(formData: FormData): T {
  const dto: Partial<T> = {}; // Inicializamos el DTO como un objeto parcial.

  for (const [key, value] of formData.entries()) {
    // Si hay múltiples valores para una clave (como archivos), los manejamos como un array.
    if (formData.getAll(key).length > 1) {
      dto[key as keyof T] = formData.getAll(key) as any; // Suponiendo que sean `File[]` o un array compatible.
    } else {
      dto[key as keyof T] = value as any; // Cast genérico.
    }
  }

  return dto as T; // Convertimos el objeto parcial en el tipo esperado.
}
