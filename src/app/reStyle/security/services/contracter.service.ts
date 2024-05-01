import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {Contracter} from "../model/contracter.entity";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContracterService extends BaseService<Contracter> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = 'JanoverSaldana/contracters/contracters';
  }
}
