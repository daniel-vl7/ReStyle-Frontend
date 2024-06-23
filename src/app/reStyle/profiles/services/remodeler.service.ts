import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {Remodeler} from "../model/remodeler.entity";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RemodelerService{

  /*constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = 'JanoverSaldana/remodeler/remodelers';
  }*/
  baseUrl: string = `${environment.serverBasePath}`;
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
