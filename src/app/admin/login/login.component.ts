import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;
  changePassForm: FormGroup;

  loading: boolean;
  signinUser: boolean;
  user: any;

  constructor(private fb: FormBuilder, private router: Router, public snackbar: MatSnackBar, private authService: AuthService) {

    this.signinForm = fb.group({
      'email': [null, [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      'password': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]]
    });

    this.changePassForm = fb.group({
      'password': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(60)]]
    });

  }

  ngOnInit() {
    this.signinUser = true;
  }

  signin(): void {
    if (this.signinForm.valid) {
      this.loading = true;
      this.authService.signIn(this.signinForm.value).subscribe(res => {
         if (res.challengeName === 'NEW_PASSWORD_REQUIRED') {
          this.signinUser = false;
          this.loading = false;
          this.user = res;
          this.snackbar.open('A new password is required.', '', {
            duration: 4000
          });
        } else if (res.username) {
          this.router.navigate(['/management']);
        }
      }, error => {
        if (error.code && error.code === 'UserNotFoundException') {
          this.loading = false;
          this.snackbar.open('The email address provided cannot be found. Please try again or register an account.', '', {
            duration: 4000
          });
        } else if (error.code && error.code === 'NotAuthorizedException') {
          this.loading = false;
          this.snackbar.open('The password entered is incorrect.', '', {
            duration: 4000
          });
        }
      });
    }
  }

  changePass(): void {
    if (this.changePassForm.valid) {
      this.loading = true;
      this.authService.newPassword(this.user, this.changePassForm.value.password).subscribe(res => {
        this.loading = false;
        this.signinUser = true;
        this.snackbar.open('Your password has been changed, please login.', '', {
          duration: 3000
        });
      });
    }
  }

}

