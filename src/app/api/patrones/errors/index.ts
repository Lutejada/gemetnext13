export class PatronYaExiste extends Error{
    status:number
    constructor() {
        super();
        this.message="El Patron con ese codigo ya existe"
        this.cause="negocio"
        this.status = 400;
    }
}
export class PatronNoExiste extends Error{
    status:number
    constructor() {
        super();
        this.message="El Patron con ese codigo no existe"
        this.cause="negocio"
        this.status = 400;
    }
}
export class DatosMetrologicosYaExisten extends Error{
    status:number
    constructor() {
        super();
        this.message="Los datos metrologicos de este patron ya existen"
        this.cause="negocio"
        this.status = 400;
    }
}

export class DatosComplementariosYaExisten extends Error{
    status:number
    constructor() {
        super();
        this.message="Los datos complementarios de este patron ya Existen"
        this.cause="negocio"
        this.status = 400;
    }
}