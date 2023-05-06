export class EquipoNoEncontrado extends Error{
    status:number
    constructor() {
        super();
        this.message="Equipo no encontrado"
        this.cause="negocio"
        this.status = 400;
    }
}