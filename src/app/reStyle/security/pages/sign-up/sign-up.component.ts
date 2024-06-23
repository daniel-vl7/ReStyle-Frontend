import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from "../../../../shared/components/base-form.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {SignUpRequest} from "../../model/sign-up.request";
import {MatCardModule} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatError} from "@angular/material/form-field";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-sign-up',
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
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent extends BaseFormComponent implements OnInit {
  form!: FormGroup;
  submitted= false;

  constructor(private builder: FormBuilder, private authenticationService: AuthenticationService){
    super();
  }

  ngOnInit(): void {
    this.form= this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(){
    if(this.form.invalid) return;
    let username= this.form.value.username;
    let password= this.form.value.password;
    let roles = ["ROLE_CONTRACTOR"];

    const signUpRequest= new SignUpRequest(username, password, roles);
    this.authenticationService.signUp(signUpRequest);
    this.submitted = true;
  }
}
