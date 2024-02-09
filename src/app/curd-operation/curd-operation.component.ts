import { Component, OnInit } from '@angular/core';
import { OurServicesService } from '../our-services.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-curd-operation',
  templateUrl: './curd-operation.component.html',
  styleUrl: './curd-operation.component.scss'
})
export class CurdOperationComponent implements OnInit {
  MainData:any
  constructor(private _services:OurServicesService){}
  ngOnInit(): void {
    this._services.GetAlluserDetails().subscribe((result)=>{
      console.log(result);
      this.MainData=result
    })

    
  }

  reactiveForm=new FormGroup({
    firstName:new FormControl(),
    lastName:new FormControl(),
    email:new FormControl(),
    Phone:new FormControl(),
    Address:new FormControl(),
  })

  adduser(){
    console.log(this.reactiveForm.value);
    

  }

}
