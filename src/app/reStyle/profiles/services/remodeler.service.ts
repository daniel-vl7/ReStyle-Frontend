import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {Remodeler} from "../model/remodeler.entity";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RemodelerService extends BaseService<Remodeler>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = 'JanoverSaldana/remodeler/remodelers';
  }
}
