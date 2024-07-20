import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserRouteActivatorService {

  constructor(private usersService: UsersService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot){
    const userExists = !!this.usersService.getUser(route.params['userId']);
    if(!userExists) this.router.navigate(['/404']);
    return userExists;
  }

}
