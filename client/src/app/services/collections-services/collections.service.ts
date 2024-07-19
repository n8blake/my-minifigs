import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICollection } from 'src/app/Interfaces/icollection.interface';
import { ErrorHandlerService } from '../error-handler.service';
import { ISet } from 'src/app/Interfaces/iset.interface';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  baseURL: string = '';

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {
    if (!environment.production) {
      this.baseURL = environment.apiURL;
    }
  }

  getCollection(collection: string): Observable<ICollection> {
    // const options = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //   }),
    // };
    const url = `${this.baseURL}/api/lego/collections/${collection}/`
    console.log(`Getting: ${url}`);
    return this.http.get<ICollection>(url).pipe(catchError(this.errorHandler.handleError<ICollection>('getCollection')));
  }

  // getSet(collection: string, set: string): Observable<ISet> {
  //   const options = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${localStorage.getItem('token')}`,
  //     }),
  //   };
  //   const url = `${this.baseURL}/api/lego/collections/${collection}/${set}`
  //   console.log(`Getting: ${url}`);
  //   return this.http.get<ISet>(url, options).pipe(catchError(this.errorHandler.handleError<ISet>('getSet')));
  // }

}
