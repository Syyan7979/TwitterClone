import { Injectable } from '@angular/core';
import {

  HttpEvent,
 
  HttpInterceptor,
 
  HttpHandler,
 
  HttpRequest,
 
  HttpResponse,
 
  HttpErrorResponse
 
 } from '@angular/common/http';
 
 import { Observable, throwError } from 'rxjs';
 
 import { retry, catchError } from 'rxjs/operators';
 

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{
  intercept(
    request : HttpRequest<any>,
    next : HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            window.alert(error.error.message)
          }
          return throwError(() => error.message);
        } else {
          return throwError(() => error);
        }
      })
    )
  }
}
