import { Routes } from '@angular/router';
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";
import {HomeComponent} from "./public/pages/home/home.component";
import {RemodelerSearchComponent} from "./reStyle/remodeler/components/remodeler-search/remodeler-search.component";
import {ComingSoonComponent} from "./public/pages/coming-soon/coming-soon.component";
import {RemodelerDetailComponent} from "./reStyle/remodeler/components/remodeler-detail/remodeler-detail.component";
export const routes: Routes = [
  {path:'', pathMatch: 'full', redirectTo: 'home'},
  {path: 'remodelers', component: RemodelerSearchComponent},
  {path: 'remodelers/:id', component: RemodelerDetailComponent},
  {path: 'coming-soon', component: ComingSoonComponent},
  {path:'home',  component: HomeComponent},
  {path: '**', component: PageNotFoundComponent},
];
