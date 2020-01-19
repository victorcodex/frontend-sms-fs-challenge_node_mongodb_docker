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

import { AgGridModule } from 'ag-grid-angular';

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
        AgGridModule.withComponents([]),
        AppRoutingModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatButtonModule,
        MatCardModule,
        MatNativeDateModule,
      ],
      providers: [
        Constants,
        LocationService,
        Helpers,
        MatDatepickerModule,
        MatButtonModule,
        MatCardModule,
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

});
