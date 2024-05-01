import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "/src/environments/environment.ts";
import {Observable} from "rxjs";
import {TrakingI} from "../models/trackingI";

@Injectable({
  providedIn: 'root'
})
export class TrackingIService {
  baseURL: string = environment.baseURL

  constructor(private http: HttpClient) {

  }
  getTrackingI():Observable< TrakingI> {
    return this.http.get <TrakingI> (`${this.baseURL}/vargas3470/tracking/procesosRemodelacion`);

  }
}

