import { Pipe } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'matchDate'
})
export class MatchDatePipe {

  transform(value: any, args: string[]): string {
    return moment(value).format('Do MMMM');
  }

}