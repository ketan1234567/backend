import { Component, OnInit, ViewChild } from '@angular/core';
import { OurServicesService } from '../our-services.service';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-curd-operation',
  templateUrl: './curd-operation.component.html',
  styleUrl: './curd-operation.component.scss'
})
export class CurdOperationComponent implements OnInit {
  MainData: any
  editUser: any
  EditById: any
  @ViewChild('closebutton') closebutton;
  @ViewChild('openbutton') openbutton;
  constructor(private _services: OurServicesService, private _router: Router) { }
  ngOnInit(): void {
    this._services.GetAlluserDetails().subscribe((result) => {
      console.log(result);
      this.MainData = result
      // this.adduser()
    })


  }

  reactiveForm = new FormGroup({
    id: new FormControl(),
    firstName: new FormControl([]),
    lastName: new FormControl(),
    email: new FormControl(),
    Phone: new FormControl(),
    Address: new FormControl(),
  })

  adduser() {

    const data = this._router
    if (this.reactiveForm.valid) {
      console.log("This is valid form ");


      this._services.SaveUser(this.reactiveForm.value).subscribe((result) => {
        if (result) {
          Swal.fire({ text: "Successfully Saved", icon: 'success' })
            .then(function (result) { data.navigate(['/curd_Operation']) }

            )
          this.closebutton.nativeElement.click();
          this.ngOnInit()
          this.reactiveForm.reset()
        } else {
          Swal.fire({ text: "Error", icon: 'error' }).then(function (result) { data.navigate(['/tables']) })
        }
      })

    }



  }
onEditUser(id: any) {
  this._services.onEditByUser(id).subscribe(
    (result) => {
      if (result && result.id) {
        console.log(result.id);
        this.editUser = result;
        this.EditById = id;

        this.reactiveForm.setValue({
          id: this.editUser.id,
          firstName: this.editUser.firstName,
          lastName: this.editUser.lastName,
          email: this.editUser.email,
          Phone: this.editUser.Phone,
          Address: this.editUser.Address
        });
      } else {
        console.error("Error: Unexpected response or missing data", result);
        // Handle error case appropriately, e.g., show error message to the user
      }
    },
    (error) => {
      console.error("Error:", error);
      // Handle error case appropriately, e.g., show error message to the user
    }
  );
}

onSubmit(buttonType: string) {
  if (buttonType === "Register") {
    console.log(buttonType);
    this.adduser();
  }
  if (buttonType === "Updated") {
    console.log(buttonType);
    console.log("in update form", this.reactiveForm.value);
    this._services.UpdatedUser(this.reactiveForm.value).subscribe(
      (result) => {
        console.log("Update result:", result); // Log the response for debugging
        if (result && result.firstName) {
          Swal.fire({ text: "Updated Successfully", icon: 'success' });
          console.log(result.firstName, "In result");
        } else {
          console.error("Error: Unexpected response or missing data", result);
          Swal.fire({ text: "Unexpected response or missing data", icon: 'error' });
        }
      },
      (error) => {
        console.error("Error:", error);
        Swal.fire({ text: "Error", icon: 'error' });
      }
    );
  }
}

  
  
  }




