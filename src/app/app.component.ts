import { Component } from '@angular/core'
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public router: Router) {


  }


}
