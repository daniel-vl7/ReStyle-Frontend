import { Routes } from '@angular/router';
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";
import {HomeComponent} from "./public/pages/home/home.component";
import {RemodelerSearchComponent} from "./reStyle/remodeler/components/remodeler-search/remodeler-search.component";
import {ComingSoonComponent} from "./public/pages/coming-soon/coming-soon.component";
import {RemodelerDetailComponent} from "./reStyle/remodeler/components/remodeler-detail/remodeler-detail.component";
import {SignInComponent} from "./reStyle/security/components/sign-in/sign-in.component";
import {SignUpComponent} from "./reStyle/security/components/sign-up/sign-up.component";

export const routes: Routes = [

  {path:'home',  component: HomeComponent},
  {path: 'home/signUp', component: SignUpComponent},
  {path: 'home/signIn', component: SignInComponent},


  {path: 'remodelers', component: RemodelerSearchComponent},
  {path: 'remodelers/:id', component: RemodelerDetailComponent},
  {path: 'coming-soon', component: ComingSoonComponent},


  {path:'', pathMatch: 'full', redirectTo: 'home'},



  {path: '**', component: PageNotFoundComponent},



];
