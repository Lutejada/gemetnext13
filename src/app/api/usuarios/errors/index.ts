export class UsuarioNoExiste extends Error{
    status:number
    constructor() {
        super();
        this.message="El Usuario no existe"
        this.cause="negocio"
        this.status = 400;
    }
}
export class UsuarioExiste extends Error{
    status:number
    constructor() {
        super();
        this.message="El Usuario existe"
        this.cause="negocio"
        this.status = 400;
    }
}
