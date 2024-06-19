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
import{UserService} from "../../../security/services/user.service";
import {SidebarComponent} from "../../../../public/components/sidebar/sidebar.component";
import {ToolbarComponent} from "../../../../public/components/toolbar/toolbar.component";
import {User} from "../../../security/model/user.entity";
import {RemodelerApiService} from "../../../remodeler/services/remodeler-api.service";
import {ContractorSidebarComponent} from "../../../../public/components/sidebarcontractor/sidebar.component";

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
        ContractorSidebarComponent,
    ],
  templateUrl: './contracter-profile.component.html',
  styleUrl: './contracter-profile.component.css'
})
export class ContracterProfileComponent implements OnInit{

  userID: any;
  userData = new User();
  remodeler: any = {};
  reviews: any[] = [];
  contracterData: Contracter = new Contracter()

  constructor(private contracterService: ContracterService,  private remodelerApiService: RemodelerApiService, private userService: UserService) {
    this.userID = sessionStorage.getItem('userId');
  }

  getResource() {
    this.userService.getUserById(this.userID).subscribe((response: any) => {
      this.userData = response;
    }, (error) => {
      console.error('Error al leer usuario', error);
    });
    this.contracterService.getContractorById(this.userID).subscribe((response: any)=>{
      this.contracterData = response;
    },(error) => {
      console.error('Error al agregar usuario', error);
    });
    this.remodelerApiService.getReviewByContractorId(this.userID).subscribe((response: any) => {
      this.reviews = response;
    }, (error) => {
      console.error('Error al leer review', error);
    });
  }

  ngOnInit(): void {
    this.getResource();
  }
}
