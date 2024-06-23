import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {Remodeler} from "../model/remodeler.entity";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RemodelerService{

  baseUrl: string = 'http://localhost:8080/api/v1';
  constructor(private http:HttpClient) { }

  getRemodelers(){
    return this.http.get(`${this.baseUrl}/remodelers`);
  }
  getRemodelerById(id: any){
    return this.http.get(`${this.baseUrl}/remodelers/${id}`);
  }
  createRemodeler(data: any){
    return this.http.post(`${this.baseUrl}/remodelers`, data);
  }
}
