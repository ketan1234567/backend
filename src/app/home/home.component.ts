import { Component, OnInit } from '@angular/core';
import { OurServicesService } from '../our-services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  articleLength:any
  AlluserCount:any

  constructor(private _services:OurServicesService){}
  ngOnInit(): void {
 this._services.GetAllDataWether().subscribe((result)=>{
  this.articleLength=result.articles.length

 })
 this._services.GetAlluserDetails().subscribe((result)=>{
  this.AlluserCount=result.length
  console.log(result.length);
  
 })

  }

}
