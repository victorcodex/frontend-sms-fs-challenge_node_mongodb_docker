import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocationService } from './../../services/location/location.service';
import { Subscription } from 'rxjs';
import { Location } from './../../interfaces/location';
import { Constants } from './../../config/constants';
import {GridOptions} from 'ag-grid-community';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, OnDestroy {

  subscriptionManager = new Subscription();
  locations: any;
  loading: boolean = false;

  columnDefs = [
    {headerName: 'City', field: 'city', sortable: true, filter: true},
    {headerName: 'Start date', field: 'start_date', sortable: true, filter: true},
    {headerName: 'End date', field: 'end_date', sortable: true, filter: true},
    {headerName: 'Price', field: 'price', sortable: true, filter: true},
    {headerName: 'Status', field: 'status', sortable: true, filter: true},
    {headerName: 'Color', field: 'color', sortable: true, filter: true}
  ];

rowData: any;

  constructor(private locationService: LocationService, private constants: Constants) {
    this.subscriptionManager.add(this.locations);

  }

  public customCellRendererMethod(param): string {
    return param.value;
  }

  ngOnInit() {
    this.getLocations();
  }

  createLocation(): void {
    const location: Location = this.constants.LOCATION_MOCK_DATA;
    this.locationService.createLocation(location).subscribe(response => {
      this.rowData = response['docs'];
      console.log(response);
    });
  }

  getLocations(): void {
    this.loading = true;
    this.locationService.getLocations(this.constants.PAGINATION_OBJ).subscribe((response: Location[]) => {
      this.locations = response['docs'];
      console.log(response);
      this.loading = false;
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
      // this.locations = response;
      console.log(response);
    });
  }

  deleteLocationById(id: string): void {
    this.locationService.deleteLocationById(id).subscribe(response => {
      // this.locations = response;
      console.log(response);
    });
  }

  ngOnDestroy(): void {
    this.subscriptionManager.unsubscribe();
  }

}
