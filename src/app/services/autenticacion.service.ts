import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
/* import { JwtHelperService } from "@auth0/angular-jwt"; */
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders(
    {
      "Content-Type": "application/json"
    }
  ),
};
@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {


  constructor(private http:HttpClient) { }

  signin(user:any): Observable<any>{
    return this.http.post(`${environment.url}/login/`,user, httpOptions).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
 /*  isAuth():boolean{
    const token:any= localStorage.getItem('token');
    if(this.jwtHelper.isTokenExpired(token) ||!localStorage.getItem('token')){
      return false;
    }
    return true;
  } */

  // error handle
  handleError(error: HttpErrorResponse) {
    let errorMessage = "Unknown error!";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
