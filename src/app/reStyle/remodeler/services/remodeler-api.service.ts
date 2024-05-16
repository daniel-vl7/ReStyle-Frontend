import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class RemodelerApiService {

  baseUrl: string = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

  getRemodelers(){
    return this.http.get(`${this.baseUrl}/remodelers`);
  }
  getRemodelerById(id: any){
    return this.http.get(`${this.baseUrl}/remodelers/${id}`);
  }
  createProyectRequest(data: any){
    return this.http.post(`${this.baseUrl}/proyectRequests`, data);
  }
}
