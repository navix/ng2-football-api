import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { ActivatedRoute, Params } from "@angular/router";

import { Competition } from "../../core/models/competition.model";
import { StoreService } from "../../core/store.service";
import { Fixture } from "../../core/models/fixture.model";
import { TableStanding } from "../../core/models/table.model";

@Component({
  selector: 'home-competition-page',
  templateUrl: 'competition-page.component.html',
  styleUrls: ['competition-page.component.scss'],
})
export class CompetitionPageComponent implements OnInit, OnDestroy {

  protected competition$ = new BehaviorSubject<Competition>(null);
  protected fixtureHover$ = new BehaviorSubject<string[]>([]);
  protected fixtures$ = new BehaviorSubject<Fixture[]>([]);
  protected league$ = new BehaviorSubject<string>(null);
  protected subs: Subscription[] = [];
  protected table$ = new BehaviorSubject<TableStanding[]>([]);
  protected tour$ = new BehaviorSubject<number>(null);

  constructor(private route: ActivatedRoute,
              private store: StoreService) {
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngOnInit() {
    console.log('INIT!!!');
    // subscribe league$
    this.route.params.map((params: Params) => params['league']).subscribe(this.league$);
    // subscribe competition$
    this.league$.map(league => this.store.state.data.competitions.find(x => x.league == league)).subscribe(this.competition$);
    // subscribe tour$
    this.league$.map(league => this.store.state.data.competitions.find(x => x.league == league).currentMatchday).subscribe(this.tour$);
    // subscribe $fixtures
    // react on league, tour or store competitions changes
    Observable.combineLatest(
        this.league$,
        this.tour$,
        this.store.select('data/competitions'),
        (league, tour, competitions) => {
          return {league, tour, competitions};
        }
    ).map(combined => combined.competitions.find(x => x.league == this.league$.value).fixtures.filter(x => x.matchday == this.tour$.value))
        .subscribe(this.fixtures$);
    // check fixtures and fetch more if needed
    let dataPending = false;
    this.subs.push(this.fixtures$.subscribe(fixtures => {
      if (!dataPending && fixtures.length === 0) {
        dataPending = true;
        this.store.data.fetchFixtures(this.competition$.value.id, this.tour$.value).subscribe(length => {
          if (length == 0) {
            throw new Error('Empty fetch!');
          }
          dataPending = false;
        });
      }
    }));
    // subscribe table$
    this.competition$.map(competition => competition.table.standing).subscribe(this.table$);
  }

  protected isFixtureHighlighted(fixture: Fixture): boolean {
    let hovered = this.fixtureHover$.value;
    return hovered.indexOf(fixture.homeTeamName) !== -1 || hovered.indexOf(fixture.awayTeamName) !== -1;
  }

  protected nextTour() {
    if (this.tour$.value < this.competition$.value.numberOfMatchdays) {
      let tour = this.tour$.value + 1;
      this.tour$.next(tour);
    }
  }

  protected prevTour() {
    if (this.tour$.value > 1) {
      let tour = this.tour$.value - 1;
      this.tour$.next(tour);
    }
  }

}