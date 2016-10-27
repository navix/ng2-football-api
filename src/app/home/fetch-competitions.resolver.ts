import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { StoreService } from "../core/store.service";

@Injectable()
export class FetchCompetitionsResolver implements Resolve<boolean> {

  constructor(private store: StoreService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.store.data.fetchCompetitions().subscribe(state => {
        observer.next(true);
        observer.complete();
      });
    });
  }
}