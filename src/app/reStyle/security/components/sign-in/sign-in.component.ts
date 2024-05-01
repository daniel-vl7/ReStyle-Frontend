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
  loginForm: FormGroup = this.formBuilder.group({
    email: ['gonzalo@restyle.com', { validators: [Validators.required, Validators.email], updateOn: 'change'}],
    password: ['', {validators: [Validators.required ], updateOn: 'change'}]
  })

  logged: boolean =false;
  currentUser!: User;

  users: User[] = [];

  constructor(private formBuilder: FormBuilder, private usersService: UserService, private router: Router) {

  }

  ngOnInit(): void {
  }

  submitted() {
    this.logged=true;
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password')
  }


  getAllResources(){
    this.usersService.getAll().subscribe((response: any)=>{
      this.users = response;
      console.log(this.users)
    })
  }

  submitForm(){

    this.getAllResources();

    this.usersService.getAll().subscribe((response: any)=>{

      const user = response.find((a: any)=> {
        this.currentUser = a;
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      });

      if(user) {
        //Imprime en consola el usuario que se logueo
        console.log(user)
        //Guarda el usuario en el sessionStorage
        sessionStorage.setItem("userId", this.currentUser.id.toString());

        this.loginForm.reset();

        if (this.currentUser.type == "Remodeler") {

          this.usersService.getItemByField("userId", Number(sessionStorage.getItem("userId"))).subscribe((response: any) => {
            sessionStorage.setItem("typeId", response.id.toString());
          });

          this.router.navigate(['home/remodeler']).then((r: any) => console.log(r));
        }
        else if (this.currentUser.type == "Contracter"){
          this.router.navigate(['home/user']).then((r: any) => console.log(r));
        } else{
          console.log("Usuario o contraseña incorrectos")
        }
      }
    })
  }
}