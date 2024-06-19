import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {User} from "../model/user.entity";
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class UserService{
  /*constructor(http: HttpClient) {
  super(http);
  //this.resourceEndpoint = 'JanoverSaldana/users/users';
  this.resourceEndpoint = '/user';
}*/

  baseUrl: string = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get(`${this.baseUrl}/user`);
  }
  getUserById(id: any){
    return this.http.get(`${this.baseUrl}/user/${id}`);
  }
  getUserByField(field: string, value: any){
    return this.http.get(`${this.baseUrl}/${field}/${value}`);
  }
  createUser(data: any){
    return this.http.post(`${this.baseUrl}/user`, data);
  }
}
