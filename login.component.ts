import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../assets/css/custom/style.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  emailError: string = '';
  passwordError: string = '';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required, 
        Validators.minLength(8)
      ]),
    });
  }

  resetErrorMsgs() {
    this.emailError = '';
    this.passwordError = '';
  }

  login() {
    this.resetErrorMsgs();
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (response) => {                           //Next callback
          console.log(response);
          this.router.navigate([""]);
        },
        (error) => {
          console.error(error.status + ": " + error);
        }
      )
    }  else {
      if (!this.loginForm.get('email').valid) {
        this.emailError = "Error entering email";
      }
      if (!this.loginForm.get('password').valid) {
        this.passwordError = "Error entering password";
      }
    }
  }
  
}
