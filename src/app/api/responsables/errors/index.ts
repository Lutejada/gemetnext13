export class ResponsableYaExiste extends Error{
    status:number
    constructor() {
        super();
        this.message="El responsable con esa identificacion ya existe"
        this.cause="negocio"
        this.status = 400;
    }
}

export class ResponsableNoExiste extends Error{
    status:number
    constructor() {
        super();
        this.message="El responsable con esa identificacion ya no existe"
        this.cause="negocio"
        this.status = 400;
    }
}