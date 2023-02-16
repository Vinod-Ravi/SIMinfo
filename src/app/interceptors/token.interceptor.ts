import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { Messages } from '../models/class/messages.model';
import { ApiService } from '../services/api.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService,
    private toast: NgToastService,
    private router: Router,
    private api: ApiService,) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.getToken();
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    }
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            return this.handleUnAuthorizedError(request, next);
          }
        }
        return throwError(() => new Error("Error in Interceptor"));
      })
    );
  }
  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {
    let messageModel = new Messages();
    messageModel.accessToken = this.auth.getToken()!;
    messageModel.refreshToken = this.auth.getRefreshToken()!;
    return this.api.renewToken(messageModel)
      .pipe(
        switchMap((data: Messages) => {
          this.auth.storeRefreshToken(data.refreshToken);
          this.auth.storeToken(data.accessToken);
          req = req.clone({
            setHeaders: { Authorization: `Bearer ${data.accessToken}` }
          })
          return next.handle(req);
        }),
        catchError((err) => {
          return throwError(() => {
            this.toast.warning({ detail: "Warning", summary: "Token is expired please login again", duration: 5000 });
            this.auth.signOut();
            this.router.navigate(['login']);
          })
        })
      )
  }
}
