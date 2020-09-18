import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
 // import { HttpHeaders, HttpEvent, HttpResponse, HttpParams } from '@angular/common/http';
 import { HttpHeaders, HttpEvent, HttpResponse, HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) {}

  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (this.jwtService.getToken()) {
      headersConfig['Authorization'] = `Token ${this.jwtService.getToken()}`;
    }
    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: any) {
     return Observable.throw(error.json());
  }

  get(path: string): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders() })
    .pipe(catchError(this.formatErrors))
    // .pipe(map((res: HttpEvent) => res.json()));
  }
  put(path: string): Observable<any> {
    return this.http.put(`${environment.api_url}${path}`, { headers: this.setHeaders(), responseType: 'json' })
    .pipe(catchError(this.formatErrors))
    // .pipe(map((res: HttpEvent) => res.json()));
  }
  post(path: string): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, { headers: this.setHeaders(), responseType: 'json' })
    .pipe(catchError(this.formatErrors))
    // .pipe(map((res: HttpEvent) => res.json()));
  }
  delete(path: string): Observable<any> {
    return this.http.delete(`${environment.api_url}${path}`, { headers: this.setHeaders() })
    .pipe(catchError(this.formatErrors))
    // .pipe(map((res: HttpEvent) => res.json()));
  }

  // put(path: string, body: Object = {}): Observable<any> {
  //   return this.http.put(
  //     `${environment.api_url}${path}`,
  //     JSON.stringify(body),
  //     { headers: this.setHeaders() }
  //   )
  //   .pipe(catchError(this.formatErrors)
  //   .pipe(map((res: HttpResponse) => res.json()));
  // }

  // post(path: string, body: Object = {}): Observable<any> {
  //   return this.http.post(
  //     `${environment.api_url}${path}`,
  //     JSON.stringify(body),
  //     { headers: this.setHeaders() }
  //   )
  //   .pipe(catchError(this.formatErrors)
  //   .pipe(map((res: HttpResponse) => res.json()));
  // }

  // delete(path): Observable<any> {
  //   return this.http.delete(
  //     `${environment.api_url}${path}`,
  //     { headers: this.setHeaders() }
  //   )
  //   .pipe(catchError(this.formatErrors)
  //   .pipe(map((res: HttpResponse) => res.json()));
  // }
}
