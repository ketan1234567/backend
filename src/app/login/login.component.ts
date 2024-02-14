import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  toggleForms(event:Event) {
    event.preventDefault()
    this.loginFormVisible = !this.loginFormVisible;
    this.registerFormVisible = !this.registerFormVisible;
  }

  onSubmitLoginForm() {
    // Handle login form submission
    if (this.loginForm.valid) {
      console.log('Login form submitted:', this.loginForm.value);
    }
  }

  onSubmitRegisterForm() {
    // Handle register form submission
    if (this.registerForm.valid) {
      console.log('Register form submitted:', this.registerForm.value);
    }
  }}
  

