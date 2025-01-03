export class ClienteNoExiste extends Error{
    status:number
    constructor() {
        super();
        this.message="El cliente con ese nombre noexiste"
        this.cause="negocio"
        this.status = 400;
    }
}