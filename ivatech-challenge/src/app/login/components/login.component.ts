import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Login } from 'src/app/models/login.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  username: string = 'freddy';
  password: string = 'ElmStreet2019';
  error: string = '';

  private onDestroy$: Subject<void> = new Subject();

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  ngOnInit(): void {
    this.loginService.checkLoginCookies().pipe(takeUntil(this.onDestroy$)).subscribe(res => {
      if (res.access_token) {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }

  valueChange(): void {
    if (this.error) {
      this.error = '';
    }
  }

  login(): void {
    this.loginService.login(this.username, this.password).pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (login: Login) => {
        this.loginService.setTokenAndRefresh(login);
      },
      error: error => {
        if (error?.error?.msg) {
          this.error = error.error.msg;
        }
      },
      complete: () => { }
    });
  }

}
