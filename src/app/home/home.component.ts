import { Component, OnInit } from '@angular/core';
import { OurServicesService } from '../our-services.service';
import { Router } from '@angular/router';
import { json } from 'body-parser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  articleLength:any
  AlluserCount:any
  LocalVariable:any
  AllAdminCount:any
  whoRole:any


  

  constructor(private _services:OurServicesService,private _router:Router){}
  ngOnInit(): void {
 this._services.GetAllDataWether().subscribe((result)=>{
  this.articleLength=result.articles.length

 })
 this._services.GetAlluserDetails().subscribe((result)=>{
  this.AlluserCount=result.user
 console.log(this.AlluserCount);
  
  
 })
 this.userData()



  }

  userData() {
    const storedData = localStorage.getItem('userDetails');
    if (storedData) {
      try {
        const role = JSON.parse(storedData);
        if (role && role.role) {
          this.whoRole = role.role;
          this.AllAdminCount = role.role.length;
          // Additional processing or error handling can be added here if needed
        } else {
          this._router.navigate(['/login']);
          console.warn('Invalid user data found in localStorage');
        }
      } catch (error) {
        this._router.navigate(['/login']);
        console.error('Error parsing user data from localStorage:', error);
      }
    } else {
      this._router.navigate(['/login']);
      console.warn('No user data found in localStorage');
    }
  }
  

}
