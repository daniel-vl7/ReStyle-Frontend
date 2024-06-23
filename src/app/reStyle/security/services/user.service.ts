import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {User} from "../model/user.entity";
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class UserService{

  baseUrl: string = 'http://localhost:8080/api/v1';
  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get(`${this.baseUrl}/profiles`);
  }
  getUserById(id: any){
    return this.http.get(`${this.baseUrl}/profiles/${id}`);
  }
  getContractorById(id: any){
    return this.http.get(`${this.baseUrl}/contractors/${id}`);
  }
  getUserByField(field: string, value: any){
    return this.http.get(`${this.baseUrl}/${field}/${value}`);
  }
  createUser(data: any){
    return this.http.post(`${this.baseUrl}/profiles`, data);
  }
}
