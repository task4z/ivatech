import { HttpClient } from '@angular/common/http';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, of, take } from 'rxjs';
import { AccessToken } from 'src/app/models/access-token.model';
import { Login } from 'src/app/models/login.model';

import { LoginService } from './login.service';

const MOCKED_LOGIN: Login = {
  access_token: 'testAccessToken',
  refresh_token: 'testRefreshToken',
  refreshTime: new Date(),
  expireDate: new Date()
} as Login;

const EMPTY_LOGIN: Login = {
  access_token: '',
  refresh_token: ''
} as Login;

describe('LoginService', () => {
  let service: LoginService;

  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let fakeRouter = { navigateByUrl: jasmine.createSpy('navigateByUrl') };
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    cookieServiceSpy = jasmine.createSpyObj('CookieService', ['delete', 'set', 'get']);
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: Router, useValue: fakeRouter },
        { provide: CookieService, useValue: cookieServiceSpy },
      ]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', (done: DoneFn) => {

    httpClientSpy.post.and.returnValue(of(MOCKED_LOGIN));

    service.login('', '').subscribe({
      next: login => {
        expect(login)
          .withContext('expected Login')
          .toEqual(MOCKED_LOGIN);
        done();
      },
      error: () => done.fail,
    });
    expect(httpClientSpy.post.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('should return login token', () => {
    service.setTokenAndRefresh(MOCKED_LOGIN);
    expect(service.getLoginTokenValue()).toBe(MOCKED_LOGIN);
  });

  it('should logout', () => {
    service.logout();
    expect(cookieServiceSpy.delete).toHaveBeenCalled();
    expect(fakeRouter.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should have values in cookie from loginToken$', () => {
    service.setToken(MOCKED_LOGIN);
    service.checkLoginCookies().subscribe({
      next: res => {
        expect(res.access_token)
          .withContext('expected Login')
          .toEqual(MOCKED_LOGIN.access_token)
      }
    });
  });

  it('should return the existing access_token', fakeAsync(() => {
    let testRefresh = {
      ...MOCKED_LOGIN,
      expireDate: dateAdd(MOCKED_LOGIN.expireDate as Date, 'day', 2),
      refreshTime: dateAdd(MOCKED_LOGIN.refreshTime as Date, 'minute', 2)
    } as Login;
    cookieServiceSpy.get.and.returnValue(JSON.stringify(testRefresh));
    service.setCookie(testRefresh);
    service.setLoginToken(EMPTY_LOGIN);
    let finalRes: Login | AccessToken | undefined;
    service.checkLoginCookies().pipe(take(1)).subscribe(res => finalRes = res);
    expect(finalRes?.access_token)
      .withContext('')
      .toEqual(MOCKED_LOGIN.access_token);
  }));

  it('should return empty access_token and logout', fakeAsync(() => {
    let testRefresh = {
      ...MOCKED_LOGIN,
      expireDate: dateAdd(MOCKED_LOGIN.expireDate as Date, 'day', -2)
    } as Login;
    cookieServiceSpy.get.and.returnValue(JSON.stringify(testRefresh));
    service.setCookie(testRefresh);
    service.setLoginToken(EMPTY_LOGIN);
    let finalRes: Login | AccessToken | undefined;
    service.checkLoginCookies().pipe(take(1)).subscribe(res => finalRes = res);
    expect(finalRes?.access_token)
      .withContext('')
      .toEqual('');
    expect(fakeRouter.navigateByUrl).toHaveBeenCalledWith('/login');
  }));

  it('should refresh cookie', fakeAsync(() => {
    httpClientSpy.post.and.returnValue(of({ access_token: 'refreshed' }));
    let testRefresh = {
      ...MOCKED_LOGIN,
      expireDate: dateAdd(MOCKED_LOGIN.expireDate as Date, 'day', 2),
      refreshTime: dateAdd(MOCKED_LOGIN.refreshTime as Date, 'minute', -5)
    } as Login;
    service.setCookie(testRefresh);
    service.setLoginToken(EMPTY_LOGIN);
    cookieServiceSpy.get.and.returnValue(JSON.stringify(testRefresh));
    let finalRes: Login | AccessToken | undefined;
    service.checkLoginCookies().pipe(take(1)).subscribe(res => finalRes = res);
    expect(finalRes?.access_token)
      .withContext('expected Login')
      .toEqual('refreshed');
  }));
});


function dateAdd(date: Date, interval: string, units: number) {
  var res = new Date(date)
  switch (interval) {
    case 'day': res.setDate(res.getDate() + units); break;
    case 'minute': res.setTime(res.getTime() + units * 60000); break;
  }
  return res;
}