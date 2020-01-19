import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './../../app-routing.module';
import { AppComponent } from './../../app.component';
import { Constants } from './../../config/constants';
import { LocationService } from './../../services/location/location.service';
import { Helpers } from './../../config/helpers';
import { LocationComponent } from './location.component';


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
        MatInputModule,
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
        MatInputModule,
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

  it('should hide spinner when isLoadingResults is turned to false', () => {
    component.isLoadingResults = true;
    fixture.detectChanges();
    component.isLoadingResults = false;
    expect(component.isLoadingResults).toBe(false);
  });

  it('isLoadingResults default initial value should be true', () => {
    expect(component.isLoadingResults).toBe(true);
  });

  it('resultsLength default initial value should be 0', () => {
    expect(component.resultsLength).toBe(0);
  });

});
