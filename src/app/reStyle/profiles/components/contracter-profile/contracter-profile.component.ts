import {Component, OnInit} from '@angular/core';
import {Contracter} from "../../model/contracter.entity";
import {ContracterService} from "../../services/contracter.service";
import {ViewRenovationsService} from "../../services/view.renovations.service";
import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {NgForOf} from "@angular/common";
import {SidebarComponent} from "../../../../public/components/sidebar/sidebar.component";
import {ToolbarComponent} from "../../../../public/components/toolbar/toolbar.component";

@Component({
  selector: 'app-contracter-profile',
  standalone: true,
  imports: [
    MatButton,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatIcon,
    NgForOf,
    MatCardImage,
    SidebarComponent,
    ToolbarComponent,
  ],
  templateUrl: './contracter-profile.component.html',
  styleUrl: './contracter-profile.component.css'
})
export class ContracterProfileComponent implements OnInit{

  userID: any;

  contracterData: Contracter = new Contracter()

  constructor(private contracterService: ContracterService,  private remodelerApiService: ViewRenovationsService) {
    this.userID = sessionStorage.getItem('userId');
  }

  getResource() {
    this.contracterService.getItemById(this.userID).subscribe((response: any)=>{
      this.contracterData = response;
      console.log(this.contracterData)
    },(error) => {
      console.error('Error al agregar usuario', error);
    })
  }

  ngOnInit(): void {
    this.getResource();
    this.getRemodelerById(1);
  }

  remodeler: any = {};

  getRemodelerById(id: any):void{
    this.remodelerApiService.getRemodelerById(id).subscribe((data:any)=>{
          this.remodeler = data;
          console.log(this.remodeler);
        },
        (error:any)=>{
          console.log(error);
        });
  }



}
