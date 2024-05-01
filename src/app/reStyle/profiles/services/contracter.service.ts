import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../../shared/services/base.service";
import {Contracter} from "../model/contracter.entity";

@Injectable({
  providedIn: 'root'
})
export class ContracterService extends BaseService<Contracter>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = 'JanoverSaldana/contracter/contracters';
  }
}
