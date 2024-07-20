import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/Interfaces/iuser.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user?: IUser;

  constructor(private authService: AuthService, private router: Router){

  }

  ngOnInit(): void {
    console.log("Hello from header");
    this.authService.checkAuthenticationStatus().subscribe(user => {
      //console.log(user);
    })
    this.authService.user$.subscribe(user => {
      this.user = user;
    })
    this.authService.logoutUser$.subscribe(logout => {
      if(logout){
        this.user = undefined;
      }
    })
  }

}
