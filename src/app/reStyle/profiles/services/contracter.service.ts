import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../../shared/services/base.service";
import {Contracter} from "../model/contracter.entity";

@Injectable({
  providedIn: 'root'
})
export class ContracterService {

  /*constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = 'JanoverSaldana/contracter/contracters';
  }*/
  baseUrl: string = 'http://localhost:8080/api/v1';
  constructor(private http:HttpClient) { }

  getContractors(){
    return this.http.get(`${this.baseUrl}/contractors`);
  }
  getContractorById(id: any){
    return this.http.get(`${this.baseUrl}/contractors/${id}`);
  }
  createContractor(data: any){
    return this.http.post(`${this.baseUrl}/contractors`, data);
  }
}
