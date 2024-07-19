import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from '../error-handler.service';
import { catchError, Observable } from 'rxjs';
import { ISet } from 'src/app/Interfaces/iset.interface';

@Injectable({
  providedIn: 'root'
})
export class SetsService {

  baseURL: string = '';

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { 
    if (!environment.production) {
      this.baseURL = environment.apiURL;
    }
  }

  getSet(set: string): Observable<ISet> {
    const url = `${this.baseURL}/api/lego/sets/${set}/`
    //console.log(`Getting: ${url}`);
    return this.http.get<ISet>(url).pipe(catchError(this.errorHandler.handleError<ISet>('getSet')));
  }

}
