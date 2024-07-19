import { Injectable } from '@angular/core';
import { CollectionsService } from '../collections-services/collections.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { SetsService } from './sets.service';

@Injectable({
  providedIn: 'root'
})
export class SetDataResolverService {

  constructor(private setsService: SetsService) { }

  resolve(route: ActivatedRouteSnapshot): unknown {
    console.log("Resolving set...")
    //const collection = route.params['collection'];
    const set = route.params['set'];
    return this.setsService.getSet(set);
  }

}
