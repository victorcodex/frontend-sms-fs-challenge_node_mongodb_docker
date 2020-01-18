import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LocationComponent } from './../pages/location/location.component';
import { Constants } from './../config/constants';
import { LocationService } from './../services/location/location.service';
import { Helpers } from './../config/helpers';
import {AgGridModule} from 'ag-grid-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    AppComponent,
    LocationComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([]),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule,
    MatNativeDateModule
  ],
  providers: [
    Constants,
    LocationService,
    Helpers,
    MatDatepickerModule,
    MatButtonModule,
    MatCardModule
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
