import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { json } from 'body-parser';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OurServicesService {
  checkIfDisabled: any

  private currentUser: BehaviorSubject<any>=new BehaviorSubject<any>(null);
  private isLoggedIn:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);


  

  ///apiurl= "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=810060449e7e4d15b1bbea2c3355b3c1";
  userapi = "http://localhost:4200/api/books";
  userapit = "http://localhost:4200/api/books/";

  apiurl = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=97eb649a42914441ab8896fc208d42cd";

  constructor(private _Http: HttpClient,private _router:Router) { }

  GetAllDataWether(): Observable<any> {
    return this._Http.get<any>(this.apiurl)
  }
  GetAlluserDetails(): Observable<any> {
    return this._Http.get<any>(this.userapi)
  }
  SaveUser(data: any) {
    return this._Http.post<any>(this.userapi, data)
  }
  onEditByUser(id: any): Observable<any> {
    return this._Http.get(this.userapi + "/" + id)
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

  deleteItem(id: any): Observable<any> {
    const url = `${this.userapi}/${id}`;
    return this._Http.delete(url);
  }

  NoBackReturnSamePage() {
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
    }
  }

  checkRoleFirst() {
    const storedData = localStorage.getItem('signUp');

    const parsedData = JSON.parse(storedData);
    const OurmainRole = parsedData.role
    console.log(OurmainRole);

    if (storedData == "") {
      console.log("this is empty data");
    } else {
      console.log("This  is login user")
    }
  }
  get currentUser$(){
    return this.currentUser.asObservable();
  }
  get isLoggedIn$(){
    return this.isLoggedIn.asObservable();
  }
    authLogin(res:any){
   localStorage.setItem("userDetails",JSON.stringify(res))
   this._router.navigate(['login']);
   this.currentUser.next(res);
   this.isLoggedIn.next(true)
    }
    logout(){
      this.currentUser.next(null);
      this.isLoggedIn.next(false)
    }



  }



