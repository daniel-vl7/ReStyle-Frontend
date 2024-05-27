import { Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common'

import {MatPaginator} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTabsModule} from "@angular/material/tabs";

import {Remodeler} from "../../models/remodeler";
import {RemodelerApiService} from "../../services/remodeler-api.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SidebarComponent} from "../../../../public/components/sidebar/sidebar.component";
import {ToolbarComponent} from "../../../../public/components/toolbar/toolbar.component";

@Component({
  selector: 'app-remodeler-search',
  standalone: true,
    imports: [
        MatPaginator,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatCheckboxModule,
        MatTabsModule,
        CommonModule,
        FormsModule,
        SidebarComponent,
        ToolbarComponent
    ],
  templateUrl: './remodeler-search.component.html',
  styleUrl: './remodeler-search.component.css'
})
export class RemodelerSearchComponent implements OnInit{

  business: Remodeler[] = [];
  projects: any[] = [];
  searchTerm: string = '';

  @ViewChild(MatPaginator, {static:true}) paginator!: MatPaginator;

  constructor(private remodelerApiService: RemodelerApiService, private router: Router) {
  }
  ngOnInit(){
    this.getResources();
  }

  getResources():void{
    this.remodelerApiService.getBusiness().subscribe((data: any)=>{
        this.business = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          image: item.image,
          expertise: item.expertise,
          address: item.address,
          city: item.city,
          description: item.description,
          remodelerId: item.remodelerId
        }));
      },
      (error:any)=>{
        console.log(error);
      });
    this.remodelerApiService.getProjects().subscribe((data: any)=>{
        this.projects = data;
      },(error:any)=>{
        console.log(error);
      });
  }

  getProjectsByBusinessId(businessId: number): any[] {
    return this.projects.filter(project => Number(project.businessId) === businessId);
  }

  redirectToComponent(id: number) {
    this.router.navigateByUrl(`/business/${id}`);
  }

  applyFilter(filter: string) {
    if(filter === "Lima"){
      this.remodelerApiService.getBusiness().subscribe(
        (data: any) => {
          this.business = data.filter((remodeler: any) => remodeler.city === filter).map((item: any) => ({
            id: item.id,
            name: item.name,
            image: item.image,
            expertise: item.expertise,
            address: item.address,
            city: item.city,
            description: item.description,
            remodelerId: item.remodelerId
          }));
        },
        (error: any) => {
          console.log(error);
        }
      );
    }else if(filter === "Provincia"){
      this.remodelerApiService.getBusiness().subscribe(
        (data: any) => {
          this.business = data.filter((remodeler: any) => remodeler.city !== 'Lima').map((item: any) => ({
            id: item.id,
            name: item.name,
            image: item.image,
            expertise: item.expertise,
            address: item.address,
            city: item.city,
            description: item.description,
            remodelerId: item.remodelerId
          }));
        },
        (error: any) => {
          console.log(error);
        }
      );
    }else if(filter === "Todos"){
      this.getResources();
    }
  }
  applySearchFilter(input: string): void {
    this.searchTerm = input;
    this.remodelerApiService.getBusiness().subscribe(
      (data: any) => {
        this.business = data.filter((remodeler: any) =>
          remodeler.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          remodeler.city.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          remodeler.expertise.toLowerCase().includes(this.searchTerm.toLowerCase())
        ).map((item: any) => ({
          id: item.id,
          name: item.name,
          image: item.image,
          expertise: item.expertise,
          address: item.address,
          city: item.city,
          description: item.description,
          remodelerId: item.remodelerId
        }));
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  clearFilter(){
    this.searchTerm = '';
    this.getResources();
  }
}
