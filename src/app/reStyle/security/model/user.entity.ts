export class User {
    id: number
    username: string
    email: string
    password: string
    type: string
    firstName: string
    paternalSurname: string
    maternalSurname: string


    constructor() {
        this.id = 0;
        this.username = '';
        this.email = '';
        this.password = '';
        this.type = '';
        this.firstName = '';
        this.paternalSurname = '';
        this.maternalSurname = '';
    }
}
