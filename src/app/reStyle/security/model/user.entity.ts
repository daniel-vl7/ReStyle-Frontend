export class User {
    email: string
    password: string
    type: string
    firstName: string
    paternalSurname: string
    maternalSurname: string
    image: string

    constructor(email: string, password: string, type: string, firstName: string, paternalSurname: string, maternalSurname: string, image: string) {
        this.email = email;
        this.password = password;
        this.type = type;
        this.firstName = firstName;
        this.paternalSurname = paternalSurname;
        this.maternalSurname = maternalSurname;
        this.image = image;
    }
}
