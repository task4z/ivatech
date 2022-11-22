import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, BehaviorSubject, Subject, map, Subscription, of, catchError } from 'rxjs';
import { AccessToken } from 'src/app/models/access-token.model';
import { Login } from 'src/app/models/login.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginToken$: BehaviorSubject<Login> = new BehaviorSubject({ access_token: '', refresh_token: '' } as Login);
  private logout$: Subject<void> = new Subject();

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { }

  public login(username: string, password: string): Observable<Login> {
    let param = { username, password };
    const now = new Date();
    return this.http.post<Login>(`${environment.apiUrl}login`, param).pipe(
      map((login: Login) => {
        if (login) {
          login.refreshTime = this.dateAdd(now, 'minute', 15);
          login.expireDate = this.dateAdd(now, 'day', 30);
        }
        return login;
      }));
  }

  private getLoginToken(): Observable<Login> {
    return this.loginToken$.asObservable();
  }

  public getLoginTokenValue(): Login {
    return this.loginToken$.value;
  }

  public logout(): void {
    this.loginToken$ = new BehaviorSubject({ access_token: '', refresh_token: '' } as Login);
    this.cookieService.delete('login');
    this.logout$.next();
    this.logout$.complete();
    this.router.navigateByUrl('/login');
  }

  public setTokenAndRefresh(login: Login): void {
    this.setToken(login);
    this.router.navigateByUrl('/dashboard');
  }

  public setToken(login: Login): void {
    this.setLoginToken(login);
    this.setCookie(login);
  }

  public setLoginToken(login: Login): void {
    this.loginToken$.next(login);
  }
  public setCookie(login: Login): void {
    this.cookieService.set('login', JSON.stringify(login));
  }

  public checkLoginCookies(): Observable<Login | AccessToken> {
    if (this.cookieService.get('login') && !this.loginToken$.value.access_token) {
      let login: Login = JSON.parse(this.cookieService.get('login'));
      login = { ...login, refreshTime: new Date(login.refreshTime as string), expireDate: new Date(login.expireDate as string) } as Login;
      this.loginToken$.next(login);
      if (login.refreshTime && login.expireDate && (new Date(login.refreshTime as string).getTime() - new Date().getTime() <= 1000 || (new Date(login.expireDate as Date).getTime()) - new Date().getTime() > 60000)) {
        return this.refresh();
      }
    }
    return this.getLoginToken();
  }

  public refresh(): Observable<AccessToken> {
    if ((this.loginToken$.value.expireDate as Date).getTime() - new Date().getTime() <= 60000) {
      this.logout();
      return of({ access_token: '' });
    }
    if ((this.loginToken$.value.refreshTime as Date).getTime() - new Date().getTime() > 1000) {
      return of({ access_token: this.loginToken$.value.access_token });
    }
    return this.refreshToken();
  }

  private refreshToken(): Observable<AccessToken> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.loginToken$.value.refresh_token}`
    });
    const now = new Date();
    return this.http.post<AccessToken>(`${environment.apiUrl}refresh`, null, { headers: headers }).pipe(
      map(res => {
        this.setToken({ ...this.getLoginTokenValue(), access_token: res.access_token, refreshTime: new Date(now.setTime(now.getTime() + 15 * 60000)) } as Login);
        return res;
      })
    );
  }

  private dateAdd(date: Date, interval: string, units: number): Date {
    var res = new Date(date)
    switch (interval) {
      case 'day': res.setDate(res.getDate() + units); break;
      case 'minute': res.setTime(res.getTime() + units * 60000); break;
    }
    return res;
  }

}

