export class Remodeler {
    userID: number;
    id: number;
    firstName: string;
    paternalSurname: string;
    maternalSurname: string;
    lastName: string;
    email: string;
    password: string;
    type: string;
    expertise: string;
    countProjects: number;
    location: string;
    photoUrl: string;
    rating: number;

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
        this.expertise = '';
        this.countProjects = 0;
        this.location = '';
        this.photoUrl = '';
        this.rating = 0;
    }

}
