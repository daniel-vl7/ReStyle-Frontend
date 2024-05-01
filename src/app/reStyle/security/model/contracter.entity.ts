export class Contracter {
    userID: number;
    id: number;
    firstName: string;
    paternalSurname: string;
    maternalSurname: string;
    lastName: string;
    email: string;
    password: string;
    type: string;
    photoUrl: string;

    constructor() {
        this.userID = 0;
        this.id = 0;
        this.firstName = '';
        this.paternalSurname = '';
        this.maternalSurname = '';
        this.lastName = '';
        this.email = '';
        this.password = '';
        this.type = '';
        this.photoUrl = '';
    }
}
