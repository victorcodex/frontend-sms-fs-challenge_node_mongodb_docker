import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocationService } from './../../services/location/location.service';
import { Subscription } from 'rxjs';
import { Location } from './../../interfaces/location';
import { Constants } from './../../config/constants';
import {GridOptions} from 'ag-grid-community';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit, OnDestroy {

  subscriptionManager = new Subscription();
  locations: any;
  loading: boolean = false;


  private gridOptions: GridOptions;
  title = 'ag-grid-cli';

  constructor(private locationService: LocationService, private constants: Constants) {
    this.subscriptionManager.add(this.locations);


    this.gridOptions = {} as GridOptions;
    this.gridOptions.animateRows = true;
    this.gridOptions.gridAutoHeight = true;
    this.gridOptions.columnDefs = [
        {
            headerName: 'Name',
            field: 'name',
            sort: 'asc',
            sortable: true,
            autoHeight : true,
            width: 300
        },
        {
            headerName: 'Specialization',
            field: 'specialization',
            cellRenderer: this.customCellRendererMethod,
            autoHeight : true,
            // cellRendererFramework: SpecializationComponent,
            width: 300
        },
        {
            headerName: 'Equipment',
            field: 'equipment',
            autoHeight : true,
            cellRenderer: this.customCellRendererMethod,
            // cellRendererFramework: EquipmentComponent,
            width: 300
        },
    ];

    this.gridOptions.rowData = [
      {
        name: 'Studio A',
        specialization: 'Orchestra <br> Choirs <br> Bands',
        equipment: '3 Iso Booths <br> SSL Console'
      },
      {
        name: 'Studio B',
        specialization: 'Video Game Sound <br> ADR',
        equipment: 'Digidesign 8 Channel D'
      },
      {
        name: 'Studio C',
        specialization: 'Mixing <br> Mastering <br> Recording Vocals',
        equipment: 'Digidesign 8 Channel D <br> Dynaudio <br> Meyrs'
      }
    ];


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
