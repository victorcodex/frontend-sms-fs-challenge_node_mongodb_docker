import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './../../app-routing.module';
import { AppComponent } from './../../app.component';
import { Constants } from './../../config/constants';
import { LocationService } from './../../services/location/location.service';
import { Helpers } from './../../config/helpers';
import { LocationComponent } from './location.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


describe('LocationComponent', () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LocationComponent,
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatButtonModule,
        MatCardModule,
        MatNativeDateModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        Constants,
        LocationService,
        Helpers,
        MatDatepickerModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatProgressSpinnerModule,
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Location Component', () => {
    expect(component).toBeTruthy();
  });
  // it('should do something async', (done) => {
  //   //  * arrange
  //   const ob = { _id: '5e2414465ab7ba001b249d22' };
  //   component.selected = ob;
  //   //  * act
  //   const selected$ = component.getLocationById('5e2414465ab7ba001b249d22'); // get an Observable
  //   //  * assert
  //   selected$.subscribe(selected => {
  //     expect(selected._id).toBe(ob._id);
  //     done(); // let Jasmine know that you are done testing
  //   });
  // });

});
