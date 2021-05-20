import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../auth-guard/auth.service';
import {TokenStorageService} from '../auth-guard/token-storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})


export class LoginPageComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);


  constructor(private dialog: MatDialog,
              private authService: AuthService,
              private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: this.emailFormControl,
      password: this.passwordFormControl
    });
  }

  onSubmit(): void {
    const data = {
      username: this.emailFormControl.value,
      password: this.passwordFormControl.value,
    };
    this.authService.login(data).subscribe(
      res => {
        this.tokenStorage.saveToken(res.access_token);
        this.authService.getUserRoles().subscribe(res => {
          this.tokenStorage.route(res);
        });
      },
      err => {
        console.log(err)
      }
    );
  }
}
