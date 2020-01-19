import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  [x: string]: any;

  private subscriptionManager: Subscription;

  displayedColumns: string[] = ['city', 'start_date', 'end_date', 'price', 'status', 'color'];
  locations: MatTableDataSource<Location[]>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  tempLocations: any;
  resultsLength = 0;
  currentPage: number;
  totalPages: number;
  isLoadingResults = true;

  dateFilter1 = new FormControl(new Date());
  dateFilter2 = new FormControl(new Date());

  constructor(private locationService: LocationService, private constants: Constants, private helpers: Helpers,
              private elementRef: ElementRef, private router: Router, private route: ActivatedRoute) {
    this.currentPage = constants.PAGINATION_OBJ.page;
  }

  ngOnInit(): void {
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
  goToFirstPage(): void {
    this.currentPage = this.constants.PAGINATION_OBJ.page;
    this.getLocations();
    this.assignDataSource();
  }

  goToNextPage(): void {
    this.currentPage++;
    this.getLocations();
  }

  goToPreviousPage(): void {
    this.currentPage--;
    this.getLocations();
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
    this.getLocations();
  }

  /**
   * Date sorter
   */
  sortByDateRange(): void {
    if (this.tempLocations && this.tempLocations.length > 0) {

      const startDate = this.helpers.formartDate(this.dateFilter1.value).toString();
      const endDate = this.helpers.formartDate(this.dateFilter2.value).toString();

      const getSortedData = this.helpers.locationsObjectDateSorter(
        this.tempLocations,
        startDate,
        endDate
      );

      if (getSortedData && getSortedData.length > 0) {
        this.locations = new MatTableDataSource<Location[]>(getSortedData);
        this.assignDataSource();
      }

    }
  }

  assignDataSource(): void {
    this.locations.paginator = this.paginator;
    this.locations.sort = this.sort;
  }

  resetRawData(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/locations']);
  }

  /**
   * Create Location
   */
  createLocation(): void {
    const location: Location = this.constants.LOCATION_MOCK_DATA;
    const subscription = this.locationService.createLocation(location).subscribe(response => {

    });
    this.subscriptionManager.add(subscription);
  }

  /**
   * Fetch Locations
   */
  getLocations(): void {

    this.isLoadingResults = true;
    this.constants.PAGINATION_OBJ.page = this.currentPage;

    this.subscriptionManager = this.locationService.getLocations(this.constants.PAGINATION_OBJ).subscribe((response: any) => {

      if (response.docs.length > 0) {
        this.locations = new MatTableDataSource<Location[]>(response.docs);
        this.resultsLength = this.resultsLength > 0 ? this.resultsLength : response.totalDocs;
        this.locations.sort = this.sort;
        this.isLoadingResults = false;
        this.totalPages = response.totalPages;
        this.tempLocations = response.docs;
      } else {
        this.isLoadingResults = false;
      }

    });
  }

  /**
   * Get Location By Id
   */
  getLocationById(id: string): void {
    const subscription = this.locationService.getLocationById(id).subscribe((response: Location) => {

    });
    this.subscriptionManager.add(subscription);
  }

  /**
   * Update Location By Id
   */
  updateLocationById(location: Location, id: string): void {
    const subscription = this.locationService.updateLocationById(location, id).subscribe(response => {

    });
    this.subscriptionManager.add(subscription);
  }

  /**
   * Delete Location By Id
   */
  deleteLocationById(id: string): void {
    const subscription = this.locationService.deleteLocationById(id).subscribe(response => {

    });
    this.subscriptionManager.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptionManager.unsubscribe();
  }

}
