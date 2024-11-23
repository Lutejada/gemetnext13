export interface queryValuesDTO {
  termino?: string | null;
  valor?: string | null;
  page: number;
  limit?: number;
}

export interface SearchValuesDTO {
  termino: string;
  valor: string;
  page: number;
  limit: number;
}


export interface PaginationOptions {
  page: number;
  limit: number;
}
