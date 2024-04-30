import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "/src/environments/environment.ts";

@Injectable({
  providedIn: 'root'
})
export class RemodelerApiService {

  baseUrl: string = environment.baseURL;
  constructor(private http:HttpClient) { }

  getRemodelers(){
    return this.http.get(`${this.baseUrl}/alehandraxx/myrepo/remodelers`);
  }
  getRemodelerById(id: any){
    return this.http.get(`${this.baseUrl}/alehandraxx/myrepo/remodelers/${id}`);
  }

}
