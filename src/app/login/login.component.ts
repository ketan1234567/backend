import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private formBuilder: FormBuilder,private _router:Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  toggleForms(event: Event) {
    event.preventDefault()
    this.loginFormVisible = !this.loginFormVisible;
    this.registerFormVisible = !this.registerFormVisible;
  }

  onSubmitLoginForm() {
    // Handle login form submission
    if (this.loginForm.valid) {


      const storedData = localStorage.getItem('signUp');

      // Parse the JSON string back into an object
      const parsedData = JSON.parse(storedData);

      // Use the data as needed
      console.log(parsedData.email,"This is login Form")
      if(parsedData.email===this.loginForm.value.email  && parsedData.password===this.loginForm.value.password && parsedData.role===this.loginForm.value.role){
       console.log("You have successfully goes to Admin Page");

      this._router.navigate(["home"])
      location.reload();
      }
   
      console.log('Login form submitted:', this.loginForm.value);



    }
  }

  onSubmitRegisterForm() {
    // Handle register form submission
    if (this.registerForm.valid) {
      // const email=this.registerForm.value.email
      // const password=this.registerForm.value.password
      // const role=this.registerForm.value.role
      const data = { email: this.registerForm.value.email, password: this.registerForm.value.password, role: this.registerForm.value.role };
      // console.log(email,password,role);
      const jsonData = JSON.stringify(data);

      // Save data to localStorage with a specific key
      localStorage.setItem('signUp', jsonData);

      console.log('Register form submitted:', this.registerForm.value.email);
    }
  }
}


