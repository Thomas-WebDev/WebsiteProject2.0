import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { FileSizeValidator } from './file-size.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../../assets/css/custom/style.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  
  file: File = null; // Variable to store file
  imgFile: string = 'https://bootdey.com/img/Content/avatar/avatar7.png';
  
  name: string = '';
  email: string = '';
  nameError: string = '';
  emailError: string = '';
  profilePictureError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';

  constructor(private fb: FormBuilder, 
              private authService: AuthService,
              private router: Router) { 
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      file: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required, 
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl("", [
        Validators.required, 
        Validators.minLength(8)
      ])
    } ,
    {
      validator: ConfirmPasswordValidator("password", "confirmPassword")
    });
  }

  onFileChange(event) {

    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      this.file = event.target.files[0];
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.imgFile = reader.result as string;
      };
    }
  }

  resetErrorMsgs() {
    this.nameError = '';
    this.emailError = '';
    this.profilePictureError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';
  }

  register() {
    this.resetErrorMsgs();
    if (this.registerForm.valid) {
      const formData = new FormData();
      formData.append('name', this.registerForm.get('name').value);
      formData.append('email', this.registerForm.get('email').value);
      formData.append('password', this.registerForm.get('password').value);
      formData.append('file', this.file);
      this.authService.register(formData)
        .subscribe(
          (response) => {                           //Next callback
            console.log(response['success']);
            if(!response['success']) {
              if (response['userInUse']) {
                this.nameError = 'This username is already in use. Please choose another.';
              }
              if (response['emailInUse']) {
                this.emailError = 'This email is already in use. Please choose another.';
              }
            } else {
              this.router.navigate(["login"]);
            }
          },
          (error) => {
            console.error(error.status + ": " + error);
          }
        )
    } else {
      if (!this.registerForm.get('name').valid) {
        this.nameError = "Username is a required field and must be 2 or more characters";
      }
      if (!this.registerForm.get('email').valid) {
        this.emailError = "Email is a required field and must be a valid email address";
      }
      if (!this.registerForm.get('file').valid) {
        this.profilePictureError = "Please provide a profile picture no more than 5MB";
      }
      if (!this.registerForm.get('password').valid) {
        this.passwordError = "Password must be 8 or more characters long";
      } else {
        if (!this.registerForm.get('confirmPassword').valid) {
          this.confirmPasswordError = "The passwords must match";
        }
      }
    }
  }
}
