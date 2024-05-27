import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {Remodeler} from "../model/remodeler.entity";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RemodelerService{

  /*constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = 'JanoverSaldana/remodeler/remodelers';
  }*/
  baseUrl: string = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

  getRemodelers(){
    return this.http.get(`${this.baseUrl}/remodeler`);
  }
  getRemodelerById(id: any){
    return this.http.get(`${this.baseUrl}/remodeler/${id}`);
  }
  getRemodelerByUserId(id: any){
    return this.http.get(`${this.baseUrl}/remodeler?userId=${id}`);
  }
  createRemodeler(data: any){
    return this.http.post(`${this.baseUrl}/remodeler`, data);
  }
}
