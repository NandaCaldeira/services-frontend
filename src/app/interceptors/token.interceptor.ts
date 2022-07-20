import { AuthService } from 'src/app/auth/services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService:AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.recuperarToken()

    if(token){
      const clone = request.clone({
        headers:
        request.headers.set('Authorization',`Bearer ${token}`)
      })
      return next.handle(clone)
    }
    return next.handle(request);
  }
}
