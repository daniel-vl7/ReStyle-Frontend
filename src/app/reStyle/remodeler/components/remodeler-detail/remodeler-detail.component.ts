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
import {ContracterService} from "../../../profiles/services/contracter.service";
import {UserService} from "../../../security/services/user.service";

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
  business: any = {};
  projects: any = [];
  reviews: any = [];
  contractors: any = [];
  users: any = [];
  projectRequestForm: FormGroup;
  remodelerId: any | undefined;
  contractorId: any | undefined;

  constructor(private remodelerApiService: RemodelerApiService, private contractorService: ContracterService,
              private userService: UserService, private router: Router, private fb: FormBuilder) {
      this.projectRequestForm = this.fb.group({
            name: ['', Validators.required],
            surname: ['', Validators.required],
            phone: ['', Validators.required],
            address: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            deadlineDate: ['', Validators.required],
            city: ['', Validators.required],
            budget: ['', Validators.required],
            rooms: ['', Validators.required],
            summary: ['', Validators.required]
      });
  }
  ngOnInit(){
    let id = this.router.url.split('/')[2];
    this.getResourceById(id);
    this.remodelerId = id;
    this.contractorId = sessionStorage.getItem("userId");
  }

  getResourceById(id: any):void{
    this.remodelerApiService.getBusinessById(id).subscribe((data:any)=>{
        this.business = data;
      },
      (error:any)=>{
        console.log(error);
      });
    this.remodelerApiService.getProjects().subscribe((data:any)=>{
        this.projects = data;
      },
        (error:any)=>{
          console.log(error);
    });
    this.remodelerApiService.getReviews().subscribe((data:any)=>{
        this.reviews = data;
      },
        (error:any)=>{
          console.log(error);
    });
    this.contractorService.getContractors().subscribe((data:any)=>{
        this.contractors = data;
      },
        (error:any)=> {
            console.log(error);
    });
    this.userService.getUsers().subscribe((data:any)=>{
        this.users = data;
      },
        (error:any)=>{
          console.log(error);
    });
  }

    getProjectsByBusinessId(businessId: number): any[] {
        return this.projects.filter((project: { businessId: any; }) => Number(project.businessId) === businessId);
    }

    getReviewsByBusinessId(businessId: number): any[] {
        const projects = this.getProjectsByBusinessId(businessId);
        const projectIds = projects.map(project => project.id);
        const filteredReviews = this.reviews.filter((review: { projectId: number; }) => projectIds.includes(review.projectId));
        const contractors = this.contractors;
        const users = this.users;

        return filteredReviews.map((review: { projectId: any; contractorId: any; }) => {
            const project = projects.find(project => project.id === review.projectId);
            const contractor = contractors.find((contractor: { id: any; }) => contractor.id === review.contractorId);
            const user = users.find((user: { id: any; }) => user.id === contractor?.userId);
            const contractorName = user ? `${user.firstName} ${user.paternalSurname} ${user.maternalSurname}` : 'Unknown Contractor';
            return {
                ...review,
                projectName: project?.name || 'Unknown Project',
                contractorName: contractorName,
            };
        });
    }

    onSubmit() {
        if (this.projectRequestForm.valid) {
            const formData = {
                ...this.projectRequestForm.value,
                remodelerId: this.remodelerId,
                contractorId: this.contractorId
            };
            this.remodelerApiService.createProjectRequest(formData).subscribe(
                (data: any) => {
                    alert('Project request created');
                    this.router.navigate(['/business']);
                },
                (error: any) => {
                    console.log(error);
                }
            );
        }
    }
}
