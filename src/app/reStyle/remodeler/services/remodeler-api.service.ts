import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class RemodelerApiService {

  baseUrl: string = 'http://localhost:8080/api/v1';
  constructor(private http:HttpClient) { }

  getBusiness(){
    return this.http.get(`${this.baseUrl}/businesses`);
  }
  getBusinessById(id: any){
    return this.http.get(`${this.baseUrl}/businesses/${id}`);
  }
  createProjectRequest(data: any){
    return this.http.post(`${this.baseUrl}/projectRequests`, data);
  }
  getProjectRequestsById(id: any){
    return this.http.get(`${this.baseUrl}/projectRequests/${id}`);
  }
  getProjects(){
    return this.http.get(`${this.baseUrl}/projects`);
  }
  getProjectsById(id: any){
    return this.http.get(`${this.baseUrl}/projects/${id}`);
  }
  getReviews(){
    return this.http.get(`${this.baseUrl}/reviews`);
  }
  getReviewById(id: any){
    return this.http.get(`${this.baseUrl}/reviews/${id}`);
  }
  getReviewByContractorId(id: any){
    return this.http.get(`${this.baseUrl}/reviews?contractorId=${id}`);
  }
}
