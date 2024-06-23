import {Component, Input, OnInit} from '@angular/core';
import {ToolbarComponent} from "../../public/components/toolbar/toolbar.component";
import {SidebarComponent} from "../../public/components/sidebar/sidebar.component";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {SupportSnackComponent} from "../support-snack/support-snack.component";
import {ContractorSidebarComponent} from "../../public/components/sidebarcontractor/sidebar.component";

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Event} from "@angular/router";

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [
    ToolbarComponent,
    SidebarComponent,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatSnackBarModule,
    ContractorSidebarComponent
  ],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent implements OnInit{
  _supportForm: FormGroup;

  get supportForm(): FormGroup {
    return this._supportForm;
  }

  set supportForm(value: FormGroup) {
    this._supportForm = value;
  }

  type: string = '';
  userType: string | null = null;


  constructor(  private _snackBar: MatSnackBar, private http: HttpClient, private fb: FormBuilder) {
    this._supportForm = this.fb.group({
      title: ['', Validators.required],
      message: ['', Validators.required],

    });
  }

  editForm = this.fb.group({
    photo: []
  });

  addInquiry(): void {
    this._snackBar.openFromComponent(SupportSnackComponent, {
      duration:3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }

  onSubmit() {
    if (this._supportForm.valid) {
      const formData = {
        ...this._supportForm.value,

      };
    }
  }
  ngOnInit(): void {

    this.fetchUserType().subscribe((userType: string) => {
      this.userType = userType;
    });
    this.type = sessionStorage.getItem("userType") || '';

  }

  private fetchUserType(): Observable<string> {
    return this.http.get<string>('http://localhost:3000/user'); // Adjust URL as per your JSON Server setup
  }
}
