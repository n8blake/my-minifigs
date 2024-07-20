import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../error-handler.service';
import { catchError, Observable } from 'rxjs';
import { IUser } from 'src/app/Interfaces/iuser.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseURL: string = '';

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {
    if (!environment.production) {
      this.baseURL = environment.apiURL;
    }
  }

  // get a user
  getUser(userId: string): Observable<IUser> {
    const url = `${this.baseURL}/api/users/${userId}/`
    //console.log(`Getting: ${url}`);
    return this.http.get<IUser>(url).pipe(catchError(this.errorHandler.handleError<IUser>('getUser')));
  }
  
  // get all users
  getUsers(): Observable<IUser[]> {
    const url = `${this.baseURL}/api/users/`
    //console.log(`Getting: ${url}`);
    return this.http.get<IUser[]>(url).pipe(catchError(this.errorHandler.handleError<IUser[]>('getUsers')));
  }

  // get friends list

}
