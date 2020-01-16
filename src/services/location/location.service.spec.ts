import { TestBed, getTestBed } from '@angular/core/testing';
import { LocationService } from './location.service';
import { Constants } from './../../config/constants';
import { Location } from './../../interfaces/location';
import { Helpers } from './../..//config/helpers';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {  environment as env  } from './../../environments/environment';

describe('LocationService', () => {

  let injector: TestBed;
  let service: LocationService;
  let httpMock: HttpTestingController;
  const constants = new Constants();

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

  describe('#getLocations()', () => {
    it('should fetch locations from the API via GET and should return Observable<Location[]>', () => {

      const dummyLocations: Location[] = [constants.LOCATION_MOCK_DATA, constants.LOCATION_MOCK_DATA];

      service.getLocations().subscribe((result: Location[]) => {
        expect(result.length).toBe(2);
        expect(result).toEqual(dummyLocations);
      });

      const req = httpMock.expectOne(`${env.apiUrl}/locations`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyLocations);

    });
  });

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

  // TODO: Test for failures
  // TODO: Update and Delete Tests

});
