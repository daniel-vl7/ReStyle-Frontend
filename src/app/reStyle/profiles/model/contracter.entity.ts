export class Contracter {

    userID: number;
    id: number;
    firstName: string;
    paternalSurname: string;
    maternalSurname:  string;
    email : string;
    phone : string;
    description : string;
    subscription  : string;

    constructor() {
        this.userID = 0;
        this.id = 0;
        this.firstName = '';
        this.paternalSurname = '';
        this.maternalSurname = '';
        this.email = '';
        this.phone = '';
        this.description = '';
        this.subscription = '';
    }
}
