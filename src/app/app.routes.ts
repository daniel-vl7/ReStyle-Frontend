import { Routes } from '@angular/router';
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";
import {HomeComponent} from "./public/pages/home/home.component";
import {RemodelerSearchComponent} from "src/app/reStyle/remodeler/components/remodeler-search/remodeler-search.component.ts";
import {ComingSoonComponent} from "./public/pages/coming-soon/coming-soon.component";

export const routes: Routes = [
  {path:'', pathMatch: 'full', redirectTo: 'home'},
  {path: 'remodelers', component: RemodelerSearchComponent},
  {path: 'coming-soon', component: ComingSoonComponent},
  {path:'home',  component: HomeComponent},
  {path: '**', component: PageNotFoundComponent},
];
