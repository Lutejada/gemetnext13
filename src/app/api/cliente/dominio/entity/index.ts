export class Cliente {
  id: string;
  nombre: string;

  constructor({ id = "", nombre = "" }: Partial<Cliente> = {}) {
    this.id = id;
    this.nombre = nombre;
  }
}
