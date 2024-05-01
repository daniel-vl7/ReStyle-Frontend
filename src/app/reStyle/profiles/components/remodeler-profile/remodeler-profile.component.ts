import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {SidebarComponent} from "../../../../public/components/sidebar/sidebar.component";
import {ToolbarComponent} from "../../../../public/components/toolbar/toolbar.component";
import {Contracter} from "../../model/contracter.entity";
import {ContracterService} from "../../services/contracter.service";
import {ViewRenovationsService} from "../../services/view.renovations.service";
import {RemodelerService} from "../../services/remodeler.service";
import {Remodeler} from "../../model/remodeler.entity";

@Component({
  selector: 'app-remodeler-profile',
  standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        MatCardHeader,
        MatCardSubtitle,
        MatCardTitle,
        MatIcon,
        SidebarComponent,
        ToolbarComponent
    ],
  templateUrl: './remodeler-profile.component.html',
  styleUrl: './remodeler-profile.component.css'
})
export class RemodelerProfileComponent implements OnInit{
    userID: any;

    remodelerData: Remodeler = new Remodeler()

    constructor(private remodelerService: RemodelerService) {
        this.userID = sessionStorage.getItem('userId');
    }

    getResource() {
        this.remodelerService.getItemById(this.userID).subscribe((response: any)=>{
            this.remodelerData = response;
            console.log(this.remodelerData)
        },(error) => {
            console.error('Error al leer usuario', error);
        })
    }

    ngOnInit(): void {
        this.getResource()
    }
}
