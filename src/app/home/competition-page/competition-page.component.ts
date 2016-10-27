import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { ActivatedRoute, Params } from "@angular/router";

import { Competition } from "../../core/models/competition.model";
import { StoreService } from "../../core/store.service";
import { Fixture } from "../../core/models/fixture.model";
import { Table, TableStanding } from "../../core/models/table.model";

@Component({
  selector: 'home-competition-page',
  templateUrl: 'competition-page.component.html',
  styleUrls: ['competition-page.component.scss'],
})
export class CompetitionPageComponent implements OnInit {

  protected competition$ = new BehaviorSubject<Competition>(null);
  protected fixtures$: Observable<Fixture[]>;
  protected league$: Observable<string>;
  protected table$: Observable<TableStanding[]>;
  protected tour$ = new BehaviorSubject<number>(null);

  constructor(private route: ActivatedRoute,
              private store: StoreService) {
  }

  ngOnInit() {
    // set league$
    this.league$ = this.route.params.map((params: Params) => params['league']);
    // subscribe compitition$
    this.league$.map(league => this.store.state.data.competitions.find(competition => competition.league == league)).subscribe(this.competition$);
    // subscribe tour$
    this.competition$.map(competition => competition.currentMatchday).subscribe(this.tour$);
    // set fixtures$
    this.fixtures$ = Observable
        .combineLatest(this.competition$.map(competition => competition.fixtures), this.tour$, (fixtures: Fixture[], tour: number) => {
          return {fixtures, tour}
        })
        .map((data: {fixtures: Fixture[], tour: number}) => data.fixtures.filter(fixture => fixture.matchday == data.tour));
    // set table$
    this.table$ = this.competition$.map(competition => competition.table.standing);
    this.table$.subscribe(table => {
      console.log('table', table);
    });
  }

  protected nextTour() {
    if (this.tour$.value < this.competition$.value.numberOfMatchdays) {
      this.tour$.next(this.tour$.value + 1);
    }
  }

  protected prevTour() {
    if (this.tour$.value > 1) {
      this.tour$.next(this.tour$.value - 1);
    }
  }

}