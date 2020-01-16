import { Injectable } from '@angular/core';
import { environment as env } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Location } from './../../interfaces/location';
import { Helpers } from './../../config/helpers';

@Injectable()
export class LocationService {

  headers = new HttpHeaders()
                  .set('Content-Type', 'application/json')
                  .set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  };

  constructor(private http: HttpClient, private helpers: Helpers) {

  }

  createLocation(location: Location): Observable<Location[]> {
    return this.http.post<Location[]>(`${env.apiUrl}/location/create`, location, this.httpOptions).pipe(
      catchError(this.helpers.handleError)
    );
  }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${env.apiUrl}/locations`, this.httpOptions).pipe(
      catchError(this.helpers.handleError)
    );
  }

  getLocationById(id: string): Observable<Location> {
    return this.http.get<Location>(`${env.apiUrl}/location/${id}`, this.httpOptions).pipe(
      catchError(this.helpers.handleError)
    );
  }

  updateLocationById(location: Location, id: string): Observable<Location[]> {
    console.log(env.apiUrl);
    return this.http.put<Location[]>(`${env.apiUrl}/location/${id}`, location, this.httpOptions).pipe(
      catchError(this.helpers.handleError)
    );
  }

  deleteLocationById(id: string): Observable<Location> {
    return this.http.delete<Location>(`${env.apiUrl}/location/${id}`, this.httpOptions).pipe(
      catchError(this.helpers.handleError)
    );
  }

}
