import {
    Component, OnInit, OnDestroy, style, state, animate, transition, trigger, NgZone, keyframes
} from '@angular/core';
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
  animations: [
    trigger('change', [
      state('completed', style({
        transform: 'translateX(0)'
      })),
      state('left', style({
        transform: 'translateX(+100%)'
      })),
      state('right', style({
        transform: 'translateX(-100%)'
      })),
      transition('right => completed', [
        animate(300, keyframes([
          style({opacity: 0, transform: 'translateX(+100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(-20px)', offset: 0.7}),
          style({opacity: 1, transform: 'translateX(0)', offset: 1.0})
        ]))
      ]),
      transition('left => completed', [
        animate(300, keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(+20px)', offset: 0.7}),
          style({opacity: 1, transform: 'translateX(0)', offset: 1.0})
        ]))
      ]),
      transition('completed => *', animate('200ms ease-out')),
    ]),
  ]
})
export class CompetitionPageComponent implements OnInit, OnDestroy {

  protected competition$ = new BehaviorSubject<Competition>(null);
  protected fixtureHover$ = new BehaviorSubject<string[]>([]);
  protected fixtures$ = new BehaviorSubject<Fixture[]>([]);
  protected league$ = new BehaviorSubject<string>(null);
  protected subs: Subscription[] = [];
  protected table$ = new BehaviorSubject<TableStanding[]>([]);
  protected tour$ = new BehaviorSubject<number>(null);

  // responsive
  protected responsiveTab: string = '-fixtures';

  // animations
  protected linesChange$ = new BehaviorSubject<string>('completed');
  protected nextTour$ = new BehaviorSubject<number>(null);

  constructor(private route: ActivatedRoute,
              private store: StoreService,
              private zone: NgZone) {
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
    let competitionChange$ = this.league$.map(league => this.store.state.data.competitions.find(x => x.league == league)).cache();
    competitionChange$.subscribe(this.competition$);
    // subscribe tour$
    competitionChange$.map(x => x.currentMatchday).subscribe(this.tour$);
    competitionChange$.map(x => x.currentMatchday).subscribe(this.nextTour$);
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

    // animation completing
    let animationCompeted$ = this.nextTour$.debounceTime(200).cache();
    animationCompeted$.mapTo('completed').subscribe(this.linesChange$);
    animationCompeted$.subscribe(this.tour$);
  }

  protected isFixtureHighlighted(fixture: Fixture): boolean {
    let hovered = this.fixtureHover$.value;
    return hovered.indexOf(fixture.homeTeamName) !== -1 || hovered.indexOf(fixture.awayTeamName) !== -1;
  }

  protected nextTour() {
    if (this.nextTour$.value < this.competition$.value.numberOfMatchdays) {
      this.linesChange$.next('right');
      this.nextTour$.next(this.nextTour$.value + 1);
    }
  }

  protected prevTour() {
    if (this.nextTour$.value > 1) {
      this.linesChange$.next('left');
      this.nextTour$.next(this.nextTour$.value - 1);
    }
  }

}