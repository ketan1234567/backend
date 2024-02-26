import { Component, OnInit, ViewChild } from '@angular/core';
import { OurServicesService } from '../our-services.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  LocalVariable:any

  @ViewChild('closebutton') closebutton;
  @ViewChild('openbutton') openbutton;
  isEditMode: boolean = false;
  filter = new FormControl('')
  constructor(private _services: OurServicesService, private _router: Router ,private fb: FormBuilder) { 



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
 this.userData()

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

  
  const formData = this.reactiveForm.value;


  const storedData = localStorage.getItem('signUp');
  const parsedData = JSON.parse(storedData);

  // Update the values with new data
  parsedData.firstName = formData.firstName; // Replace 'newFirstName' with the actual new first name
  parsedData.lastName = formData.lastName;
  parsedData.email = formData.email;
     // Replace 'newLastName' with the actual new last name
  // Update other properties as needed

  // Convert the updated object back to a JSON string
  const updatedData = JSON.stringify(parsedData);

  // Store the updated data back into localStorage
  localStorage.setItem('signUp', updatedData);

  // Optional: Update LocalVariable if needed
  // this.LocalVariable = parsedData;

  console.log('User data updated successfully:', parsedData);
  if (this.reactiveForm.valid) {
      const formData = this.reactiveForm.value;

      // const storedData = localStorage.getItem('signUp');
      // const parsedData = JSON.parse(storedData);

      // // Update the values with new data
      // parsedData.firstName = formData.firstName; // Replace 'newFirstName' with the actual new first name
      // parsedData.lastName = formData.lastName;
      // parsedData.email = formData.email;
      //    // Replace 'newLastName' with the actual new last name
      // // Update other properties as needed

      // // Convert the updated object back to a JSON string
      // const updatedData = JSON.stringify(parsedData);

      // // Store the updated data back into localStorage
      // localStorage.setItem('signUp', updatedData);

      // // Optional: Update LocalVariable if needed
      // // this.LocalVariable = parsedData;

      // console.log('User data updated successfully:', parsedData);










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
userData() {
  const storedData = localStorage.getItem('signUp');

  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      const data = {
        firstName: parsedData.firstName,
        lastName: parsedData.lastName,
        email: parsedData.email,
        Phone: parsedData.Phone,
        Address: parsedData.Address,
        password: parsedData.password,
        role: parsedData.role
      };
      this.LocalVariable = data;
      console.log('User data retrieved from localStorage:', this.LocalVariable);
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
    }
  } else {
    console.warn('No user data found in localStorage');
  }
}

OnUserEdit() {
  const storedData = localStorage.getItem('signUp');

  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);

      // Initialize the form with the retrieved data
      this.reactiveForm = this.fb.group({
        id: [parsedData.id], // Include the id field if it's part of the expected structure
        firstName: [parsedData.firstName, Validators.required],
        lastName: [parsedData.lastName, Validators.required],
        email: [parsedData.email, [Validators.required, Validators.email]],
        Phone: [parsedData.Phone,],
        Address: [parsedData.Address]
      });

      console.log('User data retrieved from localStorage:', parsedData);
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
    }
  } else {
    console.warn('No user data found in localStorage');
  }
}


OnUserDelete(){
    // Remove item from localStorage
    localStorage.removeItem('signUp');
  
    // Check if the item was successfully removed
    if (!localStorage.getItem('signUp')) {
      console.log("Logout_Function_Working");
      //this.isLoggedIn = false; // Set isLoggedIn to false after logout
      
      // Navigate to the 'home' route and then reload the page
      this._router.navigate(['/login']).then(() => {
        // Reload the page to reflect logout changes
        location.reload();
      });
    } else {
      console.log("Logout_Function_Not_Working");
    }
  }
}




  
  
  




