import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OurServicesService {


 ///apiurl= "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=810060449e7e4d15b1bbea2c3355b3c1";
 userapi = "http://localhost:4200/api/books";
apiurl="https://newsapi.org/v2/everything?q=tesla&from=2024-01-09&sortBy=publishedAt&apiKey=97eb649a42914441ab8896fc208d42cd"

  constructor(private _Http:HttpClient) { }

  GetAllDataWether():Observable<any> {
    return this._Http.get<any>(this.apiurl)
  }
  GetAlluserDetails():Observable<any>{
    return  this._Http.get<any>(this.userapi)
  }

}
