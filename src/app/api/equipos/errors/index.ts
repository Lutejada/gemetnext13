export class EquipoExiste extends Error{
    status:number
    constructor() {
        super();
        this.message="El Equipo con ese codigo ya existe"
        this.cause="negocio"
        this.status = 400;
    }
}
export class EquipoNoExiste extends Error{
    status:number
    constructor() {
        super();
        this.message="El Equipo con ese codigo ya no existe"
        this.cause="negocio"
        this.status = 400;
    }
}