import { Component } from '@angular/core';
import {ToolbarHomeComponent} from "../../../../public/components/toolbar-home/toolbar-home.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {UserService} from "../../services/user.service";
import {MatTableModule} from "@angular/material/table";
import {User} from "../../model/user.entity";
import {SnackbarService} from "../../../../shared/services/snackbar.service";


@Component({
  selector: 'app-sign-in',
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
    ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  //boleano de contraseña incorrecta
    incorrectPassword: boolean = false;
  //boleano de email incorrecto
    incorrectEmail: boolean = false;

  loginForm: FormGroup = this.formBuilder.group({
    email: ['gonzalo@restyle.com', { validators: [Validators.required, Validators.email], updateOn: 'change'}],
    password: ['', {validators: [Validators.required], updateOn: 'change'}]
  })

  logged: boolean =false;
  currentUser!: User;

  users: User[] = [];

  constructor(private formBuilder: FormBuilder, private usersService: UserService,
              private router: Router, private snackbarService: SnackbarService) {


  }

  showSuccessMessage(messageContent: string) {
    const successImage='assets/images/success.png'
    this.snackbarService.showSuccess1(messageContent, successImage);
  }

  showErrorMessage(messageContent: string) {
    const errorImage='assets/images/error.png'
    this.snackbarService.showError1(messageContent, errorImage);
  }


  ngOnInit(): void {
    this.getAllResources();
  }


  submitted() {
    return this.loginForm.invalid;
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password')
  }

  getAllResources(){
    this.usersService.getUsers().subscribe((response: any)=>{
      this.users = response;
    })
  }


  //Funcion para verificar la autenticacion del usuario
  authenticateUser(): boolean{

    let authenticated: boolean = false;

    this.users.forEach((user: any) => {
      if(user.email === this.loginForm.value.email && user.password === this.loginForm.value.password){
        authenticated = true;
        this.currentUser = user;
      }
    });

    //Si no esta autenticado muestra un mensaje de error
    if(!authenticated){
      this.showErrorMessage("Usuario o contraseña incorrectos")
      return false;
    }

    //Guarda el usuario en el sessionStorage
    sessionStorage.setItem("userId", this.currentUser.id.toString());

    return authenticated;
  }

  submitForm() {

    //Verifica si el usuario esta autenticado
    if (this.authenticateUser()) {

      //Muestra un mensaje de bienvenida
        this.showSuccessMessage("Inicio de sesión exitoso. " +"Bienvenido " + this.currentUser.firstName)

      this.loginForm.reset();

      if (this.currentUser.type === "remodeler") {

        console.log("Usuario logueado: " + this.currentUser.type + " " + this.currentUser.id);

        this.usersService.getUserByField("userId", Number(sessionStorage.getItem("userId"))).subscribe((response: any) => {
          sessionStorage.setItem("typeId", response.id.toString());
        });
        sessionStorage.setItem("userType", "remodeler");
        sessionStorage.setItem("name", this.currentUser.firstName.toString() + " " + this.currentUser.paternalSurname.toString());
        console.log(sessionStorage.getItem("name"))
        this.router.navigate([`home/profile/remodeler/${this.currentUser.id}`]).then((r: any) => console.log(r));
      } else if (this.currentUser.type == "contractor") {

        console.log("Usuario logueado: " + this.currentUser.type + " " + this.currentUser.id);
        sessionStorage.setItem("userType", "contractor");
        this.router.navigate([`home/profile/contractor/${this.currentUser.id}`]).then((r: any) => console.log(r));
      }
      sessionStorage.setItem("userId", this.currentUser.id.toString());
    }
  }
}
