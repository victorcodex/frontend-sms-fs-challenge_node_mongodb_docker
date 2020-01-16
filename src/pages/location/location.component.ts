import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocationService } from './../../services/location/location.service';
import { Subscription } from 'rxjs';
import { Location } from './../../interfaces/location';
import { Constants } from './../../config/constants';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit, OnDestroy {

  subscriptionManager = new Subscription();
  locations: any;

  constructor(private locationService: LocationService, private constants: Constants) {
    this.subscriptionManager.add(this.locations);
  }

  ngOnInit() {
    this.getLocations();
  }

  createLocation(): void {
    const location: Location = this.constants.LOCATION_MOCK_DATA;
    this.locationService.createLocation(location).subscribe(response => {
      console.log(response);
    });
  }

  getLocations(): void {
    this.locationService.getLocations().subscribe((response: Location[]) => {
      this.locations = response;
      console.log(response);
    });
  }

  getLocationById(id: string): void {
    this.locationService.getLocationById(id).subscribe((response: Location) => {
      this.locations = response;
      console.log(response);
    });
  }

  updateLocationById(location: Location, id: string): void {
    this.locationService.updateLocationById(location, id).subscribe(response => {
      this.locations = response;
      console.log(response);
    });
  }

  deleteLocationById(id: string): void {
    this.locationService.deleteLocationById(id).subscribe(response => {
      this.locations = response;
      console.log(response);
    });
  }

  ngOnDestroy(): void {
    this.subscriptionManager.unsubscribe();
  }

}
