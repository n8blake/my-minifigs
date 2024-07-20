import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {

  username = new FormControl('');
  password = new FormControl('');

  mouseoverLogin = false;
  loginInvalid = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    console.log("Login page loaded.")
  }

  login(): void {
    console.log(this.username.value);
    console.log(this.password.value);
    console.log("Logging in...")
    if(this.username && this.username.value && this.password && this.password.value){
    this.authService
      .loginUser(this.username.value, this.password.value)
      .subscribe((response) => {
        console.log(response);
        if (!response) {
          this.loginInvalid = true;
        } else if(response.user_name) {
          this.router.navigate(['/users', response._id]);
        }
      });
    }
  }

}
