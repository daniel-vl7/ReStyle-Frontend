import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

  baseUrl: string = environment.baseURL;
  resourceEndpoint: string = '/resources';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Manejo de errores del lado del cliente o problemas de red.
      console.log(
        `An error occurred ${error.status}, body was: ${error.error}`
      );
    } else {
      // Manejo de errores devueltos por el backend.
      console.log(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // Devuelve un Observable que emite un mensaje de error.
    return throwError(
      'Something happened with request, please try again later.'
    );
  }

  //Metodo para anidar un endpoint a la URL base
  private resourcePath(): string {
    return `${this.baseUrl}${this.resourceEndpoint}`;
  }

  // Create Resource
  create(item: any) {
    return this.http.post<T>(this.resourcePath(),
      JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Delete Resource
  delete(id: any) {
    return this.http.delete(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Update Resource
  update(id: any, item: any) {
    return this.http.put<T>(`${this.resourcePath()}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get All Resources
  getAll(): Observable<T> {
    return this.http.get<T>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
