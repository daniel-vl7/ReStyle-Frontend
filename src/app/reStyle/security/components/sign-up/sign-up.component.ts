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

  newRemodeler: Remodeler = new Remodeler();
  remodelers: Remodeler[] = [];

  newContractor: Contracter = new Contracter();
  contractors: Contracter[] = [];

  userData!: User;

  submitted: boolean = false;
  isEditMode: boolean = false;

  types: string[] = [
    "contractor",
    "remodeler"
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
    this.usersService.getUsers().subscribe((data: any) => {
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

  createUser() {
    this.newUser = {
      id: this.users.length + 1,
      username: this.registerForm.value.firstName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      type: this.registerForm.value.type,
      firstName: this.registerForm.value.firstName,
      paternalSurname: this.registerForm.value.paternalSurname,
      maternalSurname: this.registerForm.value.maternalSurname,
      image: "https://img.freepik.com/foto-gratis/cintura-arriba-retrato-hombre-guapo-afeitar-serio-mantiene-manos-juntas-vestido-camisa-azul-oscuro-ha-hablado-interlocutor-esta-parado-contra-pared-blanca-freelancer-hombre-seguro-si-mismo_273609-16320.jpg?t=st=1716787847~exp=1716791447~hmac=40efe191ceb8d2265eccb435fd9d7a32512a4fd4be65de25c015253f9869fac0&w=1380"
    };

    this.usersService.createUser(this.newUser).subscribe(
        (response) => {
          console.log('User created', response);

          if (this.newUser.type === "contractor") {
            this.newContractor = {
              id: 0,
              userId: this.newUser.id, // Usa el id retornado de la creación del usuario
              phone: "123456789",
              description: "Description"
            };
            this.contracterService.createContractor(this.newContractor).subscribe(
                (response) => {
                  console.log('Contractor created', response);
                  this.onUserCreated();
                },
                (error) => {
                  console.error('Error creating contractor', error);
                }
            );
          } else if (this.newUser.type === "remodeler") {
            this.newRemodeler = {
              id: 0,
              userId: this.newUser.id, // Usa el id retornado de la creación del usuario
              phone: "123456789",
              description: "Description",
              subscription: "premium",
              businessId: 5
            };
            this.remodelerService.createRemodeler(this.newRemodeler).subscribe(
                (response) => {
                  console.log('Remodeler created', response);
                  this.onUserCreated();
                },
                (error) => {
                  console.error('Error creating remodeler', error);
                }
            );
          } else {
            this.onUserCreated();
          }
        },
        (error) => {
          console.error('Error creating user', error);
        }
    );
  }

  onUserCreated() {
    this.registerForm.reset();
    alert("User created successfully");
    this.router.navigate(['home/signIn']);
  }

  /*addUser() {
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

      if (this.newUser.type == "contractor") {

        this.newContracter.id = 0;

        this.newContracter.userId = Number(this.users.length + 1);

        //this.newContracter.firstName = this.userData.firstName;
        //this.newContracter.lastName = this.userData.paternalSurname + " " + this.userData.maternalSurname;
        //this.newContracter.email = this.userData.email;

        this.contracterService.create(JSON.stringify(this.newContracter)).subscribe();
      } else if (this.newUser.type == "remodeler") {

        this.newRenodeler.id = 0;

        this.newRenodeler.userId = Number(this.users.length + 1);

        //this.newRenodeler.firstName = this.userData.firstName;
        //this.newRenodeler.paternalSurname = this.userData.paternalSurname
        //this.newRenodeler.maternalSurname = this.userData.maternalSurname;
        //this.newRenodeler.email = this.userData.email;

        this.remodelerService.create(JSON.stringify(this.newRenodeler)).subscribe();
      }

      this.registerForm.reset();

      this.router.navigate(['login']);
    });
  }*/
}
