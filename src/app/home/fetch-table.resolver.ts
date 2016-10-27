import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { StoreService } from "../core/store.service";

@Injectable()
export class FetchTableResolver implements Resolve<boolean> {

  constructor(private store: StoreService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<boolean> {
    return new Observable<boolean>(observer => {
      let competition = this.store.state.data.competitions.find(competition => competition.league == route.params['league']);
      if (competition.table) {
        observer.next(true);
        observer.complete();
      }
      else {
        this.store.data.fetchTable(competition.id).subscribe(state => {
          observer.next(true);
          observer.complete();
        });
      }
    });
  }
}