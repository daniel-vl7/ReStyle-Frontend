import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class RemodelerApiService {

  baseUrl: string = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

  getBusiness(){
    return this.http.get(`${this.baseUrl}/business`);
  }
  getBusinessById(id: any){
    return this.http.get(`${this.baseUrl}/business/${id}`);
  }
  createProjectRequest(data: any){
    return this.http.post(`${this.baseUrl}/projectRequest`, data);
  }
  getProjectRequestsById(id: any){
    return this.http.get(`${this.baseUrl}/projectRequest/${id}`);
  }
  getProjects(){
    return this.http.get(`${this.baseUrl}/project`);
  }
  getProjectsById(id: any){
    return this.http.get(`${this.baseUrl}/project/${id}`);
  }
  getReviews(){
    return this.http.get(`${this.baseUrl}/review`);
  }
  getReviewById(id: any){
    return this.http.get(`${this.baseUrl}/review/${id}`);
  }
  getReviewByContractorId(id: any){
    return this.http.get(`${this.baseUrl}/review?contractorId=${id}`);
  }
}
