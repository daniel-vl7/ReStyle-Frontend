import {Component, ViewChild} from '@angular/core';
import {ToolbarHomeComponent} from "../../../../public/components/toolbar-home/toolbar-home.component";
import {FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {UserService} from "../../services/user.service";
import {Router, RouterLink} from "@angular/router";

import {RemodelerService} from "../../services/remodeler.service";
import {ContracterService} from "../../services/contracter.service";
import {MatTableModule} from "@angular/material/table";
import {User} from "../../model/user.entity";
import {Remodeler} from "../../model/remodeler.entity";
import {Contracter} from "../../model/contracter.entity";


@Component({
  selector: 'app-sign-up',
  standalone: true,
    imports: [
      ToolbarHomeComponent,
      ReactiveFormsModule,
      MatFormField,
      MatInput,
      NgIf,
      RouterLink,
      MatButton,
      MatLabel,
      MatError,
      MatTableModule,
      MatOption,
      NgForOf,
      MatSelect,
    ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  newUser: User = new User();
  users: User[] = [];

  newRenodeler: Remodeler = new Remodeler();
  remodelers: Remodeler[] = [];

  newContracter: Contracter = new Contracter();
  contracter: Contracter[] = [];

  userData!: User;

  submitted: boolean = false;
  isEditMode: boolean = false;

  types: string[] = [
    "Contracter",
    "Remodeler"
  ]


  @ViewChild('signupForm', {static: true})
  signupForm!: NgForm;


  registerForm: FormGroup = this.formBuilder.group({
    firstName: ['', {validators: [Validators.required], updatedOn: 'change'}],
    paternalSurname: ['', {validators: [Validators.required], updatedOn: 'change'}],
    maternalSurname: ['', {validators: [Validators.required], updatedOn: 'change'}],
    password: ['', {validators: [Validators.required], updatedOn: 'change'}],
    email: ['', {validators: [Validators.required], updatedOn: 'change'}],
    type: ['', {validators: [Validators.required], updatedOn: 'change'}],
  })


  constructor(private usersService: UserService, private formBuilder: FormBuilder, private router: Router,
              private contracterService: ContracterService, private remodelerService: RemodelerService) {
  }


  getAllUsers() {
    this.usersService.getAll().subscribe((data: any) => {
      this.users = data;
      console.log(this.users);
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get paternalSurname() {
    return this.registerForm.get('paternalSurname');
  }

  get maternalSurname() {
    return this.registerForm.get('maternalSurname');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get type() {
    return this.registerForm.get('type');
  }

  addUser() {
    //id: number
    //username: string
    //email: string
    //password: string
    //type: string
    //firstName: string
    //paternalSurname: string
    //maternalSurname: string

    this.newUser = this.registerForm.value; //Obtengo los valores del registro (Name, PaternalSurname, MaternalSurname, Password, Email, Type)
    this.newUser.id = this.users.length + 1; //Asigno el id al nuevo usuario
    this.newUser.username = this.registerForm.value.firstName//Asigno el username al nuevo usuario

    this.usersService.create(this.newUser); //Agrego el nuevo usuario a la lista de usuarios

    console.log(this.newUser);

    this.usersService.create(JSON.stringify(this.newUser)).subscribe(response => {

      if (this.newUser.type == "Contracter") {

        this.newContracter.id = 0;

        this.newContracter.userID = Number(this.users.length + 1);

        this.newContracter.firstName = this.userData.firstName;
        this.newContracter.lastName = this.userData.paternalSurname + " " + this.userData.maternalSurname;

        this.newContracter.email = this.userData.email;
        this.newContracter.photoUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

        this.contracterService.create(JSON.stringify(this.newContracter)).subscribe();
      } else if (this.newUser.type == "Remodeler") {

        this.newRenodeler.id = 0;

        this.newRenodeler.userID = Number(this.users.length + 1);

        this.newRenodeler.firstName = this.userData.firstName;
        this.newRenodeler.paternalSurname = this.userData.paternalSurname
        this.newRenodeler.maternalSurname = this.userData.maternalSurname;
        this.newRenodeler.location = "Lima";
        this.newRenodeler.email = this.userData.email;
        this.newRenodeler.rating = 0;
        this.newRenodeler.photoUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

        this.remodelerService.create(JSON.stringify(this.newRenodeler)).subscribe();
      }

      this.registerForm.reset();

      this.router.navigate(['login']);
    });
  }
}
