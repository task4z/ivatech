import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Login } from 'src/app/models/login.model';
import { LoginService } from '../services/login.service';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';

const MOCKED_LOGIN: Login = {
  access_token: 'testAccessToken',
  refresh_token: 'testRefreshToken'
} as Login;

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let checkLoginCookiesSpy: any;
  let setTokenAndRefreshSpy: any;
  let loginSpy: any;

  let fakeRouter = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

  beforeEach(async () => {
    const fakeLoginService = jasmine.createSpyObj('LoginService', ['checkLoginCookies', 'login', 'setTokenAndRefresh']);

    checkLoginCookiesSpy = fakeLoginService.checkLoginCookies.and.returnValue(of());
    setTokenAndRefreshSpy = fakeLoginService.setTokenAndRefresh.and.returnValue();
    loginSpy = fakeLoginService.login.and.returnValue();

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useValue: fakeLoginService },
        { provide: Router, useValue: fakeRouter }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login and setTokenAndRefresh methods', () => {
    loginSpy.and.callFake(() => {
      return of(MOCKED_LOGIN);
    });
    component.login();
    expect(loginSpy).toHaveBeenCalled();
    expect(setTokenAndRefreshSpy).toHaveBeenCalled();
  });

  it('should fail login', () => {
    loginSpy.and.returnValue(throwError({ error: { msg: 'error' } }));
    component.login();
    expect(component.error).toEqual('error');
  });

  it('should reddirect to dashboard when token existts already', () => {
    checkLoginCookiesSpy.and.returnValue(of(MOCKED_LOGIN));
    component.ngOnInit();
    expect(fakeRouter.navigateByUrl).toHaveBeenCalledWith('/dashboard');
  });

  it('should remove the error', () => {
    loginSpy.and.returnValue(throwError({ error: { msg: 'error' } }));
    component.login();
    expect(component.error).toEqual('error');
    const compiled = fixture.nativeElement as HTMLElement;
    let el = compiled.querySelector('input[name="username"]');
    (el as any).value = 'New Value';
    (el as any).dispatchEvent(new Event('change'));
    expect(component.error).toEqual('');
  });

});