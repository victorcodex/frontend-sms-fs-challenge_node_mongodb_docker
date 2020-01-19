import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Subscription } from 'rxjs';

import { LocationService } from './../../services/location/location.service';
import { Location } from './../../interfaces/location';
import { Constants } from './../../config/constants';
import { Helpers } from './../../config/helpers';

/**
 * TODO: Implement pagination
 * TODO: Write tests for this component
 */
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, OnDestroy {

  /**
   * Initial subsciption
   */
  subscriptionManager = new Subscription();
  locations: Location;

  /**
   * Table columns set-up
   */
  columnDefs = [
    {headerName: 'City', field: 'city', sortable: true, width: 280},
    {headerName: 'Start date', field: 'start_date', sortable: true, width: 100},
    {headerName: 'End date', field: 'end_date', sortable: true, width: 100},
    {headerName: 'Price', field: 'price', sortable: true, width: 100},
    {headerName: 'Status', field: 'status', sortable: true, width: 100},
    {headerName: 'Color', field: 'color', sortable: true, width: 100}
  ];

rowData: any;
tempRowData: any;

dateFilter1 = new FormControl(new Date());
dateFilter2 = new FormControl(new Date());
serializedDate = new FormControl((new Date()).toISOString());

  constructor(private locationService: LocationService, private constants: Constants, private helpers: Helpers) {
    this.subscriptionManager.add(this.rowData);
  }

  ngOnInit() {
    this.getLocations();
  }

  /**
   * Date sorter
   */
  sortByDateRange() {
    if (this.tempRowData && this.tempRowData.length > 0) {

      const startDate = this.helpers.formartDate(this.dateFilter1.value).toString();
      const endDate = this.helpers.formartDate(this.dateFilter2.value).toString();

      const getSortedData = this.helpers.locationsObjectDateSorter(
        this.rowData,
        startDate,
        endDate
      );

      if (getSortedData && getSortedData.length > 0) {
        this.rowData = getSortedData;
      }

    }
  }

  resetRawData() {
    this.rowData = this.tempRowData;
  }

  /**
   * Create Location
   */
  createLocation(): void {
    const location: Location = this.constants.LOCATION_MOCK_DATA;
    this.locationService.createLocation(location).subscribe(response => {

    });
  }

  /**
   * Fetch Locations
   */
  getLocations(): void {
    this.locationService.getLocations(this.constants.PAGINATION_OBJ).subscribe((response: any) => {
      this.rowData = response.docs;
      this.tempRowData = response.docs;
    });
  }

  /**
   * Get Location By Id
   */
  getLocationById(id: string): void {
    this.locationService.getLocationById(id).subscribe((response: Location) => {

    });
  }

  /**
   * Update Location By Id
   */
  updateLocationById(location: Location, id: string): void {
    this.locationService.updateLocationById(location, id).subscribe(response => {

    });
  }

  /**
   * Delete Location By Id
   */
  deleteLocationById(id: string): void {
    this.locationService.deleteLocationById(id).subscribe(response => {

    });
  }

  /**
   * Unsubscribe all subscriptions in subscription Manager
   */
  ngOnDestroy(): void {
    this.subscriptionManager.unsubscribe();
  }

}
