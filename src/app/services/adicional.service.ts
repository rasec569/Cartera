import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { adicional } from '../Models/adicional.model';
const httpOptions = {
  headers: new HttpHeaders(
    {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+localStorage.getItem("token")
    }
  ),
};
const HttpOptionsBody = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    "Authorization": "Bearer "+localStorage.getItem("token")
  }),
  body: {id: "",},
};

@Injectable({
  providedIn: 'root'
})
export class AdicionalService {

  constructor(private http:HttpClient) { }
  //listar adiconales del contrato
  public getAdicionalesContrato(contratoid: any): Observable<any> {
    HttpOptionsBody.body.id=contratoid;
    return this.http.get(`${environment.url}/adicional/contrato/${contratoid}`,HttpOptionsBody).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //buscar
  public getAdicional(id: any): Observable<any> {
    HttpOptionsBody.body.id=id;
    return this.http.get(`${environment.url}/adicional/${id}`,HttpOptionsBody).pipe(
      tap((result: any) => {
      }),
      catchError(this.handleError)
    );
  }
  //registrar
  public createAdicional(Adicional:adicional): Observable<any> {
    return this.http
      .post(`${environment.url}/adicional/`, Adicional, httpOptions)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );
  }
  //eliminar
  public deleteAdicional(Adicional: adicional): Observable<any> {
    HttpOptionsBody.body.id=Adicional.id;
    return this.http
      .delete(`${environment.url}/adicional/`,HttpOptionsBody)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );;
  }
  //modificar
  public updateAdicional(Adicional: adicional): Observable<any> {
    return this.http
      .put(`${environment.url}/adicional/${Adicional.id}`, Adicional, httpOptions)
      .pipe(
        tap((result: any) => {
          console.log(result);
        }),
        catchError(this.handleError)
      );
  }
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
