import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OurServicesService {


 ///apiurl= "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=810060449e7e4d15b1bbea2c3355b3c1";
 userapi = "http://localhost:4200/api/books";
 userapit = "http://localhost:4200/api/books/";

apiurl="https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=97eb649a42914441ab8896fc208d42cd";

  constructor(private _Http:HttpClient) { }

  GetAllDataWether():Observable<any> {
    return this._Http.get<any>(this.apiurl)
  }
  GetAlluserDetails():Observable<any>{
    return  this._Http.get<any>(this.userapi)
  }
  SaveUser(data:any){
    return  this._Http.post<any>(this.userapi,data)
  }
  onEditByUser(id:any):Observable<any>{
   return this._Http.get(this.userapi+"/"+id)
  }
  UpdatedUser(data23: any): Observable<any> {
    const userApiUrl = `${this.userapit}/${data23.id}`;
    return this._Http.put(userApiUrl, data23)
      .pipe(
        catchError(error => {
          console.error('Error updating user:', error);
          return throwError('Could not update user. Please try again later.'); // You can customize this error message
        })
      );
      }
    }
