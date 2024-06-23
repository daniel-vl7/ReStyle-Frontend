import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatError} from "@angular/material/form-field";
import {NgIf} from "@angular/common";
import {BaseFormComponent} from "../../../../shared/components/base-form.component";
import {AuthenticationService} from "../../services/authentication.service";
import {SignInRequest} from "../../model/sign-in.request";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormField,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
    MatError
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent extends BaseFormComponent implements OnInit{
  form!: FormGroup;
  submitted = false;

  constructor(private builder: FormBuilder, private authenticationService: AuthenticationService){
    super();
  }
  ngOnInit(): void {
    this.form = this.builder.group(
        {
          username: ['', Validators.required],
          password: ['', Validators.required],
        }
    )
  }

  onSubmit(){
    if(this.form.invalid) return;
    let username= this.form.value.username;
    let password= this.form.value.password;
    const signInRequest= new SignInRequest(username, password);
    this.authenticationService.signIn(signInRequest);
    this.submitted=true;
  }

}
