import {Component, OnInit} from '@angular/core';
import {Contracter} from "../../model/contracter.entity";
import {ContracterService} from "../../services/contracter.service";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {
    MatCard, MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle,
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {NgForOf} from "@angular/common";
import {UserService} from "../../../security/services/user.service";
import {SidebarComponent} from "../../../../public/components/sidebar/sidebar.component";
import {ToolbarComponent} from "../../../../public/components/toolbar/toolbar.component";
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
        MatCardActions,
    ],
    templateUrl: './contracter-profile.component.html',
    styleUrls: ['./contracter-profile.component.css']
})
export class ContracterProfileComponent implements OnInit {
    userId: any;
    userData: any = {};
    remodeler: any = {};
    reviews: any[] = [];
    contracter: Contracter | null = null;

    constructor(
        private contracterService: ContracterService,
        private remodelerApiService: RemodelerApiService,
        private userService: UserService,
        public dialog: MatDialog
    ) {}

    getResource() {
        if (this.userId) {
            this.userService.getUserById(this.userId).subscribe(
                (response: any) => {
                    this.userData = response;
                },
                (error) => {
                    console.error('Error al leer usuario', error);
                }
            );

            this.remodelerApiService.getReviewByContractorId(this.userId).subscribe(
                (response: any) => {
                    this.reviews = response;
                },
                (error) => {
                    console.error('Error al leer review', error);
                }
            );
        }
    }

    /*
    openEditDialog(): void {
        const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
            width: '400px',
            data: { ...this.userData }
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }
    */

    transformRole(role: any): string {
        if(role[0] == 'ROLE_CONTRACTOR'){
            return 'Contractor';
        } else if(role[0] == 'ROLE_REMODELER') {
            return 'Remodeler';
        }
        return '';
    }
    ngOnInit(): void {
        this.userId = sessionStorage.getItem('signInId');
        if (this.userId) {
            this.contracter = new Contracter(
                this.userId,
                this.userId + 10,
                '999 999 999',
                'This is my description',
                'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'
            );
            this.getResource();
        } else {
            console.error('No se pudo obtener el userId del sessionStorage');
        }
    }
}
