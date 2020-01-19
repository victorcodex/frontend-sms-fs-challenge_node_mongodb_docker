import { Injectable } from '@angular/core';

import { throwError } from 'rxjs';

import { Location } from './../interfaces/location';

/**
 * TODO: Write tests for every method in this helper file
 */

@Injectable()
export class Helpers {

    constructor() {

    }

    /**
     * Formart date mm/dd/yyyy
     */
    formartDate(getDateObj: Date) {
      const dd: any = getDateObj.getDate();
      const mm: any = getDateObj.getMonth() + 1;
      const yyyy = getDateObj.getFullYear();
      const formattedDate = `${mm}/${dd}/${yyyy}`;
      return formattedDate;
    }

    /**
     * Range date sorter for Location object
     */
    locationsObjectDateSorter(locations: any, startDate: string, endDate: string) {
      if (locations && locations.length > 0) {
        const getNewFormat = locations.filter((item: Location) => (item.start_date >= startDate && item.start_date <= endDate) );
        return getNewFormat;
      }
    }

    /**
     * Basic http error handler
     */
    public handleError(error: any) {
      return throwError(error);
    }

    /**
     * Custom function to intercept and modify row items
     */
    public customAgGridCellRendererMethod(param): string {
      return param.value;
    }

}
