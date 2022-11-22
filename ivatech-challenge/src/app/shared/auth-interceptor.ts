import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, mergeMap } from 'rxjs';
import { LoginService } from '../login/services/login.service';
import { AccessToken } from '../models/access-token.model';
import { Login } from '../models/login.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private loginService: LoginService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.url.indexOf('login') > -1 || req.url.indexOf('refresh') > -1) {
            return next.handle(req);
        }
        return next.handle(req.clone({ headers: req.headers.set('Authorization', `Bearer ${this.loginService.getLoginTokenValue().access_token}`) }));
    }
}
