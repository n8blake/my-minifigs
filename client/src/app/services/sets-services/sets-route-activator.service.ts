import { Injectable } from '@angular/core';
import { SetsService } from './sets.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetsRouteActivatorService {

  constructor(private setsService: SetsService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const setExists = !!this.setsService.getSet(route.params['set'])
    // if(route.params['set']){
    //   const setExists = !!this.setsService.getSet(route.params['set'])
    // }
    if(!setExists) this.router.navigate(['/404'])
    return setExists;
  }

}
