import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { OurServicesService } from '../our-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('formAnimation', [
      state('visible', style({
        height: 'auto',
        opacity: 1
      })),
      state('hidden', style({
        height: '0px',
        opacity: 0
      })),
      transition('visible <=> hidden', [
        animate('0.3s')
      ]),
    ])
  ]
})

export class LoginComponent {

  loginForm: FormGroup;
  registerForm: FormGroup;
  loginFormVisible: boolean = true;
  registerFormVisible: boolean = false;
  isformsubmitted:any

  constructor(private formBuilder: FormBuilder,private _router:Router,private _services:OurServicesService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.maxLength(6)]],
      role: ['', Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(5)])]
    });

    this.registerForm = this.formBuilder.group({

      firstName: ['', Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(5)])],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', [Validators.required, Validators.maxLength(6)]],
      Phone: ['', [Validators.required,Validators.minLength(10)]],
      Address: ['', Validators.required],
      role: ['', Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(5)])],
      isLoggedIn:'false'
    });

    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
    }
 
  }

  toggleForms(event: Event) {
    event.preventDefault()
    this.loginFormVisible = !this.loginFormVisible;
    this.registerFormVisible = !this.registerFormVisible;
  }
  onSubmitLoginForm() {
    this.isformsubmitted=true;
    // Handle login form submission
   // const formData = this.loginForm.value;
     //console.log(this.loginForm.value);
     
    if (this.loginForm.valid) {
      const storedData = localStorage.getItem('userDetails');


    console.log(storedData);
    


      if (storedData) {
        try {
          // Parse the JSON string back into an object
          const parsedData = JSON.parse(storedData);
          const data = this._router
          if (parsedData.email === this.loginForm.value.email && parsedData.password === this.loginForm.value.password &&
            parsedData.role === this.loginForm.value.role) {
              console.log(parsedData.isLoggedIn);
              parsedData.isLoggedIn=true;
              console.log(parsedData.isLoggedIn);
              // Convert the updated object back to a JSON string
              const updatedData = JSON.stringify(parsedData);
        
              // Store the updated data back into localStorage
              localStorage.setItem('userDetails', updatedData);
              
          console.log("You have successfully logged in!");
          parsedData.isLoggedIn=true;
          Swal.fire({ text: "Successfully Login", icon: 'success' })
            .then((result) => {
            
              // Navigate to the home page after successful login
              this._router.navigate(['/home']).then(() => {
                // Reload the page after navigating to the home route
                location.reload();
              });
            });
        } else {
          console.log("Invalid credentials. Please try again.");
        }
        
        
        } catch (error) {
          console.error('Error parsing user data from localStorage:', error);
        }
      }
      
      // If the login was not successful, you can display an error message or handle it accordingly
      // For example:
      // this.errorMessage = "Invalid credentials. Please try again.";
  
      // Optionally, you might want to clear the form fields after an unsuccessful login attempt
      this.loginForm.reset();

    }
  }
  

  onSubmitRegisterForm() {
    this.isformsubmitted = true;

    // Handle register form submission

    
    if (this.registerForm.valid) {
      this._services.authLogin(this.registerForm.value)
      if(this._services.authLogin){
        const router = this._router;
        Swal.fire({ text: "Successfully Saved", icon: 'success' })
          .then(function (result) { router.navigate(['login']) });
        this.ngOnInit();
        this.registerForm.reset();
      }else{
        const router = this._router;
        Swal.fire({ text: "Error", icon: 'error' })
          .then(function (result) { router.navigate(['login']) });
      }


      console.log(this.registerForm.value);
      const data = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName, 
        email: this.registerForm.value.email,
        Phone: this.registerForm.value.Phone,
        Address: this.registerForm.value.Address,
        password: this.registerForm.value.password,
        role: this.registerForm.value.role
      };
      const jsonData = JSON.stringify(data);


  
      // Save data to localStorage with a specific key
     //const MainData= localStorage.setItem('signUp', jsonData);

    
     if (jsonData) {
      const router = this._router;
      Swal.fire({ text: "Successfully Saved", icon: 'success' })
        .then(function (result) { router.navigate(['login']) });
      this.ngOnInit();
      this.registerForm.reset();
    } else {
      const router = this._router;
      Swal.fire({ text: "Error", icon: 'error' })
        .then(function (result) { router.navigate(['login']) });
    }
    

      //console.log(MainData);
      
  
      //console.log('Register form submitted:', this.registerForm.value.email);
    } else {

      
      // Form is invalid, do something (e.g., display error messages)
      // You can also console.log() or display error messages to the user
      console.log('Form is invalid');
    }
  }
  
}


