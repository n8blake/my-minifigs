import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, tap, Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../Interfaces/iuser.interface';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  currentUser?: IUser;
  activeUserToken?: string;
  baseURL: string = '';
  private user: Subject<IUser> = new Subject<IUser>();
  private logoutUser: Subject<Boolean> = new Subject<Boolean>();
  user$ = this.user.asObservable();
  logoutUser$ = this.logoutUser.asObservable();

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {
    if (!environment.production) {
      this.baseURL = environment.apiURL;
    }
  }

  ngOnInit(): void {
    console.log('init auth service');
    const token = localStorage.getItem('token');
    if (token) {
      console.log(token);
    } else {
      console.log('not yet logged in');
    }
    this.checkAuthenticationStatus().subscribe(user => {
      console.log('fetched')
      this.currentUser = user;
    })
  }

  changeUser(user: IUser): void {
    this.logoutUser.next(false);
    this.user.next(user);
  }

  loginUser(username: string, password: string) {
    const loginInfo = {
      username,
      password,
    };

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    console.log(`attempting login`);
    return this.http
      .post(this.baseURL + '/api/auth/login/password', loginInfo, options)
      .pipe(
        tap((data: any): void => {
          this.currentUser = <IUser>data;
          this.changeUser(this.currentUser);
        })
      )
      .pipe(
        catchError((err) => {
          return of(false);
        })
      );
  }

  logout() {
    this.currentUser = undefined;
    localStorage.removeItem('token');
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    this.logoutUser.next(true);
    return this.http.get(this.baseURL + '/api/auth/logout');
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  getCurrentUser(): IUser | undefined {
    return this.currentUser;
  }

  checkAuthenticationStatus(): Observable<IUser> {

    return this.http.get(this.baseURL + '/api/auth/status').pipe(
      tap((data: any) => {
        //console.log(data.status);
        if (data) {
          if (data.user_token) {
            localStorage.setItem('user_token', data.user_token);
          }
          this.currentUser = <IUser>data;
          this.changeUser(this.currentUser);
        }
      }),
      catchError(this.errorHandler.handleError<IUser>('checkAuth'))
    );
  }
  
}
