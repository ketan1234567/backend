import { Component, OnInit } from '@angular/core';
import { OurServicesService } from '../our-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  articleLength:any
  AlluserCount:any
  LocalVariable:any

  constructor(private _services:OurServicesService,private _router:Router){}
  ngOnInit(): void {
 this._services.GetAllDataWether().subscribe((result)=>{
  this.articleLength=result.articles.length

 })
 this._services.GetAlluserDetails().subscribe((result)=>{
  this.AlluserCount=result.length
  console.log(result.length);
  
 })
 this.userData()



  }

  userData() {
    const storedData = localStorage.getItem('signUp');
  
    if (storedData) {
      try {
      } catch (error) {
        this._router.navigateByUrl('/login')
        console.error('Error parsing user data from localStorage:', error);
      }
    } else {
      this._router.navigateByUrl('/login')
      console.warn('No user data found in localStorage');
    }
  }

}
