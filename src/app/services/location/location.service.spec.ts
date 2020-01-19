import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import {  environment as env  } from './../../../environments/environment';
import { LocationService } from './location.service';
import { Constants } from './../../config/constants';
import { Location } from './../../interfaces/location';
import { Helpers } from './../..//config/helpers';

/**
 * Location Service Tests
 */
describe('LocationService - CRUD', () => {

  let injector: TestBed;
  let service: LocationService;
  let httpMock: HttpTestingController;
  const constants = new Constants();

  /**
   * Setup TestBed config
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocationService, Helpers]
    });

    injector = getTestBed();
    service = injector.get(LocationService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  /**
   * POST /location/create
   */
  describe('#createLocation()', () => {
    it('should create new location via POST', () => {
      service.createLocation(constants.LOCATION_MOCK_DATA).subscribe(result => {
        expect(result).toEqual(constants.LOCATION_MOCK_DATA);
      });

      const req = httpMock.expectOne(`${env.apiUrl}/location/create`);
      expect(req.request.method).toBe('POST');
      req.flush(constants.LOCATION_MOCK_DATA);
    });
  });

  /**
   * GET /locations/locations
   */
  describe('#getLocations()', () => {
    it('should fetch locations from the API via GET and should return Observable<Location[]>', () => {

      const dummyLocations: Location[] = [constants.LOCATION_MOCK_DATA, constants.LOCATION_MOCK_DATA];

      service.getLocations(constants.PAGINATION_OBJ).subscribe((result: Location[]) => {
        expect(result.length).toBe(2);
        expect(result).toEqual(dummyLocations);
      });

      const req = httpMock
        .expectOne(`${env.apiUrl}/locations?page=${constants.PAGINATION_OBJ.page}&limit=${constants.PAGINATION_OBJ.limit}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyLocations);

    });
  });

  /**
   * GET /location/:id
   */
  describe('#getLocationById()', () => {
    it('should fetch single location object from the API via GET and should return Observable<Location>', () => {

      const dummyLocations: Location = constants.LOCATION_MOCK_DATA;

      service.getLocationById('5e203c5f8ef301001bfaafb2').subscribe((result: Location) => {
        expect(result).toEqual(dummyLocations);
      });

      const req = httpMock.expectOne(`${env.apiUrl}/location/5e203c5f8ef301001bfaafb2`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyLocations);

    });
  });

  /**
   * PUT /location/:id
   */
  describe('#updateLocationById()', () => {
    it('should update location via PUT', () => {
      service.updateLocationById(constants.LOCATION_MOCK_DATA, '5e203c5f8ef301001bfaafb2').subscribe(result => {
        expect(result).toEqual(constants.LOCATION_MOCK_DATA);
      });

      const req = httpMock.expectOne(`${env.apiUrl}/location/5e203c5f8ef301001bfaafb2`);
      expect(req.request.method).toBe('PUT');
      req.flush(constants.LOCATION_MOCK_DATA);
    });
  });

  /**
   * DELETE /location/:id
   */
  describe('#deleteLocationById()', () => {
    it('should delete single location object from the API via DELETE', () => {

      const dummyLocations: Location = constants.LOCATION_MOCK_DATA;

      service.deleteLocationById('5e203c5f8ef301001bfaafb2').subscribe((result: Location) => {
        expect(result).toEqual(dummyLocations);
      });

      const req = httpMock.expectOne(`${env.apiUrl}/location/5e203c5f8ef301001bfaafb2`);
      expect(req.request.method).toBe('DELETE');
      req.flush(dummyLocations);

    });
  });

  // TODO: Test for failures

});
