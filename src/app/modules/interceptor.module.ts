import { Injectable, NgModule } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  private csrfToken = '';
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Use timeout to avoid circular depencency
    // https://stackoverflow.com/questions/47531874/angular-maximum-call-stack-size-exceeded-when-use-injector
    // setTimeout(() => this.getToken());
  }

  // getToken() {
  //   this.http.get(`${environment.domain}/v1.0/csrf-token`).subscribe((res: any) => {
  //     this.csrfToken = res.csrf_token;
  //   });
  // }

  sanitizeAcceptHeader(req) {
    if (req.headers.get('Accept') === 'application/pdf') {
      return req;
    } else {
      return this.addAcceptJSONHeader(req);
    }
  }

  addAcceptJSONHeader(req) {
    return req.clone({
      withCredentials: true,
      headers: req.headers
        .append('Accept', 'application/json')
    });
  }

  addXSRFTokenHeader(req) {
    return req.clone({
      withCredentials: true,
      headers: req.headers
        .append('X-XSRF-Token', this.csrfToken)
    });
  }

  removeCustomHeaderFlags(req: HttpRequest<any>) {
    return req.clone({
      withCredentials: true,
      headers: req.headers
        .delete('hasAccessToken')
    });
  }

  addAuthTokenHeader(req: HttpRequest<any>) {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      return req.clone({
        withCredentials: true,
        headers: req.headers
          .append('X-Access-Token', accessToken)
      });
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'GET' || req.method === 'OPTIONS' || req.method === 'HEAD') {
      req = this.sanitizeAcceptHeader(req);
    } else {
      req = this.sanitizeAcceptHeader(req);
      req = this.addXSRFTokenHeader(req);
    }

    if (req.headers.get('hasAccessToken') === 'true') {
      req = this.removeCustomHeaderFlags(req);
      req = this.addAuthTokenHeader(req);
    }

    return next.handle(req).do(() => { }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        switch (err.status) {

          default:
            break;
        }
      }
    });
  }
}
@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true }
  ]
})

export class InterceptorModule { }
