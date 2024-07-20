import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserDataResolverService {

  constructor(private usersService: UsersService) { }

  resolve(route: ActivatedRouteSnapshot): unknown {
    const userId = route.params['userId'];
    return this.usersService.getUser(userId)
  }

}
