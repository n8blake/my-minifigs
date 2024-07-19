import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if (error.status !== 401) {
        console.log(error);
      }
      return of(result as T);
    };
  }

}
