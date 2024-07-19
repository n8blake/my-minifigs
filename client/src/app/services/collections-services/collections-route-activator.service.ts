import { Injectable } from '@angular/core';
import { CollectionsService } from './collections.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollectionsRouteActivatorService {

  constructor(private collectionsService: CollectionsService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const collectionExists = !!this.collectionsService.getCollection(route.params['collection'])
    // if(route.params['set']){
    //   const collectionExists = !!this.collectionsService.getCollection(route.params['collection'])
    // }
    if(!collectionExists) this.router.navigate(['/404'])
    return collectionExists;
  }

}
