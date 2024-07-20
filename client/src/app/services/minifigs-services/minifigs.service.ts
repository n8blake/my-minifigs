import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../error-handler.service';
import { catchError, Observable } from 'rxjs';
import { ISearchResult } from 'src/app/Interfaces/isearch-result';

@Injectable({
  providedIn: 'root'
})
export class MinifigsService {

  baseURL: string = '';

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { 
    if (!environment.production) {
      this.baseURL = environment.apiURL;
    }
  }
  
  getMinifigsForUser(userId: string, pageSize?: number, page?: number): Observable<ISearchResult> {
    let url = `${this.baseURL}/api/lego/minifigs/${userId}/`
    if(pageSize){
      url += `?page_size=${pageSize}`
    }
    if(page){
      url += `&page=${page}`
    }
    //console.log(`Getting: ${url}`);
    return this.http.get<ISearchResult>(url).pipe(catchError(this.errorHandler.handleError<ISearchResult>('getMinifigsForUser')));
  }

}
