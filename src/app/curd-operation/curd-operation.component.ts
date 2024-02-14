import { Component, OnInit, ViewChild } from '@angular/core';
import { OurServicesService } from '../our-services.service';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';

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
  isEditMode: boolean = false;
  filter = new FormControl('')
  constructor(private _services: OurServicesService, private _router: Router) { 



    this.filter.valueChanges.pipe(
      debounceTime(300), // Wait for 300ms after the user stops typing
      distinctUntilChanged() // Only emit if the filter value has changed
    ).subscribe(() => {
      this.applyFilter();
    });
  }
  ngOnInit(): void {
    this._services.GetAlluserDetails().subscribe((result) => {
      console.log(result);
      this.MainData = result
      // this.adduser()
    })


  }

  applyFilter(): void {
    const searchText = (this.filter.value || '').toLowerCase(); // Use optional chaining to handle null/undefined
    this.MainData = this.MainData.filter((country) =>
      (country.firstName || '').toLowerCase().includes(searchText) || // Use optional chaining to handle null/undefined
      (country.lastName || '').toLowerCase().includes(searchText) ||
      (country.email || '').toLowerCase().includes(searchText) ||
      (country.Phone || '').toLowerCase().includes(searchText) ||
      (country.Address || '').toLowerCase().includes(searchText) 
    );
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
  this.isEditMode = true
 // this.isEditMode = true; // Set edit mode flag
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

onSubmit() {
  if (this.reactiveForm.valid) {
      const formData = this.reactiveForm.value;
      if (this.isEditMode) {
          // Handle update logic
          this._services.UpdatedUser(formData).subscribe(
              (result) => {
                  // Handle update success
                  console.log("User updated:", result);
                  Swal.fire({ text: "User updated successfully", icon: 'success' });
                  // Additional logic if needed
                  this.closebutton.nativeElement.click();
                  this.ngOnInit()
                  this.reactiveForm.reset()
              },
              (error) => {
                  // Handle update error
                  console.error("Error updating user:", error);
                  Swal.fire({ text: "Error updating user. Please try again later.", icon: 'error' });
              }
          );

          
      } else {
          // Handle registration logic
          this._services.SaveUser(formData).subscribe(
              (result) => {
                  // Handle registration success
                  console.log("User registered:", result);
                  Swal.fire({ text: "User registered successfully", icon: 'success' });
                  this.closebutton.nativeElement.click();
                  this.ngOnInit()
                  this.reactiveForm.reset()
                  // Additional logic if needed
              },
              (error) => {
                  // Handle registration error
                  console.error("Error registering user:", error);
                  Swal.fire({ text: "Error registering user. Please try again later.", icon: 'error' });
              }
          );
      }
  } else {
      // Handle form validation errors if needed
      console.log("Form is invalid");
      Swal.fire({ text: "Please fill in all required fields", icon: 'error' });
  }


}

onDelete(id: any) {
  Swal.fire({
    title: 'Are you sure want to remove?',
    text: 'You will not be able to recover this file!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.isConfirmed) { // Check if the user clicked the "Yes, delete it!" button
      this._services.deleteItem(id).subscribe(
        () => {
          Swal.fire(
            'Deleted!',
            'Your imaginary file has been deleted.',
            'success'
          );
          this.ngOnInit(); // Reload data after deletion
        },
        (error) => {
          Swal.fire('Error', 'Failed to delete item', 'error');
        }
      );
    } else if (result.dismiss === Swal.DismissReason.cancel) { // Check if the user clicked the "No, keep it" button or closed the modal
      Swal.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      );
    }
  });
}

}


  
  
  




