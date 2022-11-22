import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { LoginService } from '../login/services/login.service';

import { LoggedGuard } from './logged.guard';

describe('LoggedGuard', () => {
  let guard: LoggedGuard;

  let fakeRouter = { createUrlTree: jasmine.createSpy('createUrlTree') };

  let checkLoginCookiesSpy: any;

  beforeEach(() => {
    const fakeLoginService = jasmine.createSpyObj('LoginService', ['checkLoginCookies']);

    checkLoginCookiesSpy = fakeLoginService.checkLoginCookies.and.returnValue(of());

    TestBed.configureTestingModule({
      providers: [
        { provide: LoginService, useValue: fakeLoginService },
        { provide: Router, useValue: fakeRouter }
      ],
    });
    guard = TestBed.inject(LoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should go to login', () => {
    checkLoginCookiesSpy.and.returnValue(of({ access_token: '' }));
    guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot).subscribe(canActivate => {
      expect(fakeRouter.createUrlTree).toHaveBeenCalledWith(['/login']);
    });
  });

  it('should return true', () => {
    checkLoginCookiesSpy.and.returnValue(of({ access_token: 'test' }));
    guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot).subscribe(canActivate => {
      expect(canActivate).toBeTruthy();
    });
  });

});
