import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatBadgeModule} from "@angular/material/badge";
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatBadgeModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent implements OnInit {
  id: any | undefined;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = sessionStorage.getItem("signInId");
  }

  redirectToRemodelers() {
    this.router.navigate(['/business']);
  }

  redirectToSupport(){
    this.router.navigate([`support`])
  }

  redirectToProfile() {
    this.router.navigate([`home/profile/contractor/${this.id}`])
  }

  logOut(){
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }
  redirectToReviews(){
    this.router.navigateByUrl('reviews');
  }
}
