import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {SidebarComponent} from "../../../../public/components/sidebar/sidebar.component";
import {ToolbarComponent} from "../../../../public/components/toolbar/toolbar.component";
import {RemodelerService} from "../../services/remodeler.service";
import {UserService} from "../../../security/services/user.service";
import {Remodeler} from "../../model/remodeler.entity";
import {User} from "../../model/user.entity";
import {NgForOf} from "@angular/common";

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
        ToolbarComponent,
        NgForOf
    ],
  templateUrl: './remodeler-profile.component.html',
  styleUrl: './remodeler-profile.component.css'
})
export class RemodelerProfileComponent implements OnInit{
    userID: any;

    userData: User = new User()
    remodelerData: Remodeler = new Remodeler()
    remodelers: Remodeler[] = []

    constructor(private remodelerService: RemodelerService, private userService: UserService) {
        this.userID = sessionStorage.getItem('userId');
    }

    getResource() {
        // this.userService.getUserById(this.userID).subscribe((response: any) => {
        //     this.userData = response;
        //     console.log(this.userData)
        // }, (error) => {
        //     console.error('Error al leer usuario', error);
        // });
        this.remodelerService.getRemodelerByUserId(this.userID).subscribe((response: any)=>{
            this.remodelers = response;
            console.log(this.remodelerData)
        },(error) => {
            console.error('Error al leer remodelador', error);
        })
    }

    ngOnInit(): void {
        this.getResource()
    }
}
