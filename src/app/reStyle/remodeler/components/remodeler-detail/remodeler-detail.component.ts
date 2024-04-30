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
import {RemodelerApiService} from "../../services/remodeler-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-remodeler-detail',
  standalone: true,
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
  ],
  templateUrl: './remodeler-detail.component.html',
  styleUrl: './remodeler-detail.component.css'
})
export class RemodelerDetailComponent implements OnInit{
  data: any = {};
  remodeler: any = {};

  constructor(private remodelerApiService: RemodelerApiService, private router: Router) {
  }
  ngOnInit(){
    let id = this.router.url.split('/')[2];
    this.getRemodelerById(id);
  }

  getRemodelerById(id: any):void{
    this.remodelerApiService.getRemodelerById(id).subscribe((data:any)=>{
        this.remodeler = data;
      },
      (error:any)=>{
        console.log(error);
      });
  }
}
