import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment as env } from './../../../environments/environment';
import { Location } from './../../interfaces/location';
import { Helpers } from './../../config/helpers';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  /**
   * HTTP header config
   */
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  };

  constructor(private http: HttpClient, private helpers: Helpers) {

  }
  /**
   * POST /location/create
   */
  createLocation(location: Location): Observable<Location> {
    return this.http.post(`${env.apiUrl}/location/create`, location, this.httpOptions).pipe(
      catchError(this.helpers.handleError)
    );
  }

  /**
   * GET /locations/locations
   */
  getLocations(paginatonObj?: any): Observable<Location[]> {
    return this.http.get<Location[]>(`${env.apiUrl}/locations?page=${paginatonObj.page}&limit=${paginatonObj.limit}`, this.httpOptions)
      .pipe(
        catchError(this.helpers.handleError)
      );
  }

  /**
   * GET /location/:id
   */
  getLocationById(id: string): Observable<Location> {
    return this.http.get<Location>(`${env.apiUrl}/location/${id}`, this.httpOptions).pipe(
      catchError(this.helpers.handleError)
    );
  }

  /**
   * PUT /location/:id
   */
  updateLocationById(location: Location, id: string): Observable<Location> {
    return this.http.put<Location>(`${env.apiUrl}/location/${id}`, location, this.httpOptions).pipe(
      catchError(this.helpers.handleError)
    );
  }

  /**
   * DELETE /location/id
   */
  deleteLocationById(id: string): Observable<Location> {
    return this.http.delete<Location>(`${env.apiUrl}/location/${id}`, this.httpOptions).pipe(
      catchError(this.helpers.handleError)
    );
  }

}
