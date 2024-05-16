import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'

import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import {RemodelerApiService} from "../../services/remodeler-api.service";
import {Router} from "@angular/router";
import {SidebarComponent} from "../../../../public/components/sidebar/sidebar.component";
import {ToolbarComponent} from "../../../../public/components/toolbar/toolbar.component";

@Component({
  selector: 'app-remodeler-detail',
  standalone: true,
    providers: [
        provideNativeDateAdapter(),
    ],
    imports: [
        CommonModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatCheckboxModule,
        MatTabsModule,
        MatFormFieldModule,
        SidebarComponent,
        ToolbarComponent,
        MatDatepickerModule,
        FormsModule,
        ReactiveFormsModule,
    ],
  templateUrl: './remodeler-detail.component.html',
  styleUrl: './remodeler-detail.component.css'
})
export class RemodelerDetailComponent implements OnInit{
  data: any = {};
  remodeler: any = {};
  proyectRequestForm: FormGroup;
  remodelerId: any | undefined;
  clientId: any | undefined;

  constructor(private remodelerApiService: RemodelerApiService, private router: Router, private fb: FormBuilder) {
      this.proyectRequestForm = this.fb.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            phone: ['', Validators.required],
            address: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            date: ['', Validators.required],
            city: ['', Validators.required],
            budget: ['', Validators.required],
            rooms: ['', Validators.required],
            summary: ['', Validators.required]
      });
  }
  ngOnInit(){
    let id = this.router.url.split('/')[2];
    this.getRemodelerById(id);
    this.remodelerId = id;
    this.clientId = sessionStorage.getItem("userId");
  }

  getRemodelerById(id: any):void{
    this.remodelerApiService.getRemodelerById(id).subscribe((data:any)=>{
        this.remodeler = data;
      },
      (error:any)=>{
        console.log(error);
      });
  }

    onSubmit() {
        if (this.proyectRequestForm.valid) {
            const formData = {
                ...this.proyectRequestForm.value,
                remodelerId: this.remodelerId,
                clientId: this.clientId
            };
            this.remodelerApiService.createProyectRequest(formData).subscribe(
                (data: any) => {
                    alert('Project request created');
                    this.router.navigate(['/remodelers']);
                },
                (error: any) => {
                    console.log(error);
                }
            );
        }
    }
}
