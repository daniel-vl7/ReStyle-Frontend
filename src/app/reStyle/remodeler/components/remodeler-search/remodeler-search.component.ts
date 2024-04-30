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
    FormsModule
  ],
  templateUrl: './remodeler-search.component.html',
  styleUrl: './remodeler-search.component.css'
})
export class RemodelerSearchComponent implements OnInit{

  remodelers: Remodeler[] = [];
  searchTerm: string = '';

  @ViewChild(MatPaginator, {static:true}) paginator!: MatPaginator;

  constructor(private remodelerApiService: RemodelerApiService, private router: Router) {
  }
  ngOnInit(){
    this.getRemodelers();
  }

  getRemodelers():void{
    this.remodelerApiService.getRemodelers().subscribe((data: any)=>{
        this.remodelers = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          image: item.image,
          expertise: item.expertise,
          address: item.address,
          city: item.city,
          description: item.description,
          portfolio: item.portfolio,
          reviews: item.reviews
        }));
      },
      (error:any)=>{
        console.log(error);
      });
  }

  redirectToComponent(id: number) {
    this.router.navigateByUrl(`/remodelers/${id}`);
  }

  applyFilter(filter: string) {
    if(filter === "Lima"){
      this.remodelerApiService.getRemodelers().subscribe(
        (data: any) => {
          this.remodelers = data.filter((remodeler: any) => remodeler.city === filter).map((item: any) => ({
            id: item.id,
            name: item.name,
            image: item.image,
            expertise: item.expertise,
            address: item.address,
            city: item.city,
            description: item.description,
            portfolio: item.portfolio,
            reviews: item.reviews
          }));
        },
        (error: any) => {
          console.log(error);
        }
      );
    }else if(filter === "Provincia"){
      this.remodelerApiService.getRemodelers().subscribe(
        (data: any) => {
          this.remodelers = data.filter((remodeler: any) => remodeler.city !== 'Lima').map((item: any) => ({
            id: item.id,
            name: item.name,
            image: item.image,
            expertise: item.expertise,
            address: item.address,
            city: item.city,
            description: item.description,
            portfolio: item.portfolio,
            reviews: item.reviews
          }));
        },
        (error: any) => {
          console.log(error);
        }
      );
    }else if(filter === "Todos"){
      this.getRemodelers();
    }
  }
  applySearchFilter(input: string): void {
    this.searchTerm = input;
    this.remodelerApiService.getRemodelers().subscribe(
      (data: any) => {
        this.remodelers = data.filter((remodeler: any) =>
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
          portfolio: item.portfolio,
          reviews: item.reviews
        }));
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  clearFilter(){
    this.searchTerm = '';
    this.getRemodelers();
  }
}
