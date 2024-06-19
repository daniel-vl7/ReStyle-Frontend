import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent implements OnInit{

  invalidUrl: string = '';
  constructor(private route: ActivatedRoute, private router: Router) {}

  navigateToHome() {
      this.router.navigate(['home']).then();
  }
  ngOnInit() {
    this.invalidUrl = this.route.snapshot.url.join('');
  }

}
