import { Component } from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatBadgeModule} from "@angular/material/badge";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatBadgeModule,
    RouterLink
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private router: Router) {
  }
  redirectToRemodelers(){
    this.router.navigateByUrl('/remodelers');
  }
  redirectToComingSoon(){
    this.router.navigateByUrl('/coming-soon');
  }
  redirectToReviews(){
    this.router.navigateByUrl('/reviews');
  }
}
