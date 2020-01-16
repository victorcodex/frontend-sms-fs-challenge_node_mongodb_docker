import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationComponent } from './../pages/location/location.component';

const routes: Routes = [
  {
    path: 'locations',
    component: LocationComponent
  },
  {
    path: '',
    redirectTo: '/locations',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
