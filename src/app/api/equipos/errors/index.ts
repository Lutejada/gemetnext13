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
        this.message="El Equipo con ese codigo no existe"
        this.cause="negocio"
        this.status = 400;
    }
}
export class DatosMetrologicosYaExisten extends Error{
    status:number
    constructor() {
        super();
        this.message="Los datos metrologicos de este equipo ya existen"
        this.cause="negocio"
        this.status = 400;
    }
}
export class DatosComplementariosYaExisten extends Error{
    status:number
    constructor() {
        super();
        this.message="Los datos complementarios de este equipo ya existen"
        this.cause="negocio"
        this.status = 400;
    }
}