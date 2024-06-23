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
  baseUrl: string = 'http://localhost:8080/api/v1';
  constructor(private http:HttpClient) { }

  getRemodelers(){
    return this.http.get(`${this.baseUrl}/remodelers`);
  }
  getRemodelerById(id: any){
    return this.http.get(`${this.baseUrl}/remodelers/${id}`);
  }
  getRemodelerByUserId(id: any){
    return this.http.get(`${this.baseUrl}/remodelers?userId=${id}`);
  }
  createRemodeler(data: any){
    return this.http.post(`${this.baseUrl}/remodelers`, data);
  }
}
