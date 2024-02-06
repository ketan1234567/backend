import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OurServicesService {

  apiurl="https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=810060449e7e4d15b1bbea2c3355b3c1"

  constructor(private _Http:HttpClient) { }

  GetAllDataWether():Observable<any> {
    return this._Http.get(this.apiurl)
  }
}
