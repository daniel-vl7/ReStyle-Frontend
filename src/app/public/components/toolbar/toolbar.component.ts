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

  type: string = '';
  id: any | undefined;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.type = sessionStorage.getItem("userType") || '';
    this.id = sessionStorage.getItem("userId");
    console.log(this.type + ' ' + this.id);
  }

  redirectToRemodelers() {
    this.router.navigate(['/business']);
  }

  redirectToSupport(){
    this.router.navigate([`support`])
  }

  redirectToProfile() {
    this.router.navigate([`home/profile/${this.type}/${this.id}`])
  }

  logOut(){
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }
  redirectToReviews(){
    if(this.type === 'remodeler'){
      alert('Solo los contratistas pueden acceder a esta sección');
    }else if(this.type === 'contractor'){
      this.router.navigateByUrl('/reviews');
    }
  }
  redirectToProyects(){
    if(this.type === 'remodeler'){
      this.router.navigate(['/home/remodeler/tracking']);
    }else if(this.type === 'contractor'){
      this.router.navigateByUrl('/coming-soon');
    }
  }
}
