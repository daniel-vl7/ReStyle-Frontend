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
import {ToolbarHomeComponent} from "../../../../public/components/toolbar-home/toolbar-home.component";
import {UserService} from "../../services/user.service";
import {User} from "../../model/user.entity";

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
        MatError,
        ToolbarHomeComponent
    ],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.css'
})
export class SignUpComponent extends BaseFormComponent implements OnInit {
    form!: FormGroup;
    submitted= false;

    constructor(private builder: FormBuilder, private authenticationService: AuthenticationService,
                private userService:UserService){
        super();
    }

    ngOnInit(): void {
        this.form= this.builder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            firstName: ['', Validators.required],
            paternalSurname: ['', Validators.required],
            maternalSurname: ['', Validators.required],
            email: ['', Validators.required],
        })
    }

    onSubmit(){
        if(this.form.invalid) return;
        let username= this.form.value.username;
        let password= this.form.value.password;
        let roles = ["ROLE_CONTRACTOR"];

        const signUpRequest= new SignUpRequest(username, password, roles);
        this.authenticationService.signUp(signUpRequest);

        // data for profile
        let firstName= this.form.value.firstName;
        let paternalSurname= this.form.value.paternalSurname;
        let maternalSurname= this.form.value.maternalSurname;
        let email= this.form.value.email;

        //profiles resource in the backend only accepts id, email, password, typeUser, fullname

        //method to concatenate fullname with first, paternal and maternal surname
        let fullName= firstName+' '+paternalSurname+' '+maternalSurname;

        //method to adapt roles value to a normal string in lowercase
        let roleUser = roles[0].replace('ROLE_', '').toLowerCase();

        const profile = new User(email, password, roleUser, fullName);
        this.userService.createUser(profile);

        console.log('User '+profile.type+' created successfully')
        this.submitted = true;
    }

}
