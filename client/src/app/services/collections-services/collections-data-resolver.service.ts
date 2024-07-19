import { Injectable } from '@angular/core';
import { CollectionsService } from './collections.service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CollectionsDataResolverService {

  constructor(private collectionsService: CollectionsService) { }

  resolve(route: ActivatedRouteSnapshot): unknown {
    console.log(`Resolving...`);
    return this.collectionsService.getCollection(route.params['collection'])
  }

}
