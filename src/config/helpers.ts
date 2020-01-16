import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable()
export class Helpers {

    constructor() {

    }

    public handleError(error: any) {
      console.log(error);
      return throwError(error);
    }

}
