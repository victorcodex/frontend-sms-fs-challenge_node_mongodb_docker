import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Subscription } from 'rxjs';

import { LocationService } from './../../services/location/location.service';
import { Location } from './../../interfaces/location';
import { Constants } from './../../config/constants';
import { Helpers } from './../../config/helpers';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns: string[] = ['city', 'start_date', 'end_date', 'price', 'status', 'color'];
  dataSource: MatTableDataSource<Location[]>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  subscriptionManager = new Subscription();
  locations: any;
  tempLocations: any;

  resultsLength = 0;
  currentPage: number;
  totalPages: number;
  isLoadingResults = true;

  dateFilter1 = new FormControl(new Date());
  dateFilter2 = new FormControl(new Date());

  constructor(private locationService: LocationService, private constants: Constants, private helpers: Helpers,
              private elementRef: ElementRef) {
    this.subscriptionManager.add(this.locations);
    this.currentPage = constants.PAGINATION_OBJ.page;
  }

  ngOnInit() {
    this.getLocations();
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.querySelector('.mat-paginator-navigation-first')
      .addEventListener('click', this.goToFirstPage.bind(this));
    this.elementRef.nativeElement.querySelector('.mat-paginator-navigation-next')
      .addEventListener('click', this.goToNextPage.bind(this));
    this.elementRef.nativeElement.querySelector('.mat-paginator-navigation-previous')
      .addEventListener('click', this.goToPreviousPage.bind(this));
    this.elementRef.nativeElement.querySelector('.mat-paginator-navigation-last')
      .addEventListener('click', this.goToLastPage.bind(this));
  }

  /**
   * Navigators
   */
  goToFirstPage() {
    this.currentPage = this.constants.PAGINATION_OBJ.page;
    this.getLocations();
    this.assignDataSource();
  }

  goToNextPage() {
    this.currentPage++;
    this.getLocations();
  }

  goToPreviousPage() {
    this.currentPage--;
    this.getLocations();
  }

  goToLastPage() {
    this.currentPage = this.totalPages;
    this.getLocations();
  }

  /**
   * Date sorter
   */
  sortByDateRange() {
    if (this.tempLocations && this.tempLocations.length > 0) {

      const startDate = this.helpers.formartDate(this.dateFilter1.value).toString();
      const endDate = this.helpers.formartDate(this.dateFilter2.value).toString();

      const getSortedData = this.helpers.locationsObjectDateSorter(
        this.locations,
        startDate,
        endDate
      );

      if (getSortedData && getSortedData.length > 0) {
        this.locations = getSortedData;
      }

    }
  }

  resetRawData() {
    this.locations = this.tempLocations;
  }

  /**
   * Create Location
   */
  createLocation(): void {
    const location: Location = this.constants.LOCATION_MOCK_DATA;
    this.locationService.createLocation(location).subscribe(response => {

    });
  }

  assignDataSource(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Fetch Locations
   */
  getLocations(): void {

    this.isLoadingResults = true;
    this.constants.PAGINATION_OBJ.page = this.currentPage;

    this.locationService.getLocations(this.constants.PAGINATION_OBJ).subscribe((response: any) => {

      if (response.docs.length > 0) {
        this.dataSource = new MatTableDataSource<Location[]>(response.docs);
        this.resultsLength = this.resultsLength > 0 ? this.resultsLength : response.totalDocs;
        this.dataSource.sort = this.sort;
        this.isLoadingResults = false;
        this.totalPages = response.totalPages;

        this.locations = response.docs;
        this.tempLocations = response.docs;
      } else {
        this.isLoadingResults = false;
      }

    });
  }

  /**
   * Get Location By Id
   */
  getLocationById(id: string) {
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

  ngOnDestroy(): void {
    this.subscriptionManager.unsubscribe();
  }

}
