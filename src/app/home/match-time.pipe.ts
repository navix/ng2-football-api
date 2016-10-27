import { Pipe } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'matchTime'
})
export class MatchTimePipe {

  transform(value: any, args: string[]): string {
    return moment(value).format('HH:mm');
  }

}