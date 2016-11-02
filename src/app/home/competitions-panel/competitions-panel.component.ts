import { Component, OnInit, style, state, animate, transition, trigger } from '@angular/core';
import { Observable } from "rxjs";

import { Competition } from "../../core/models/competition.model";
import { StoreService } from "../../core/store.service";
import { Router } from "@angular/router";
import { ResponsiveService } from "../../core/responsive.service";

@Component({
  selector: 'home-competitions-panel',
  templateUrl: 'competitions-panel.component.html',
  styleUrls: ['competitions-panel.component.scss'],
  host: {
    '(document:mouseup)': 'hide()',
    '[@side]': 'displayed ? "active" : "inactive"',
  },
  animations: [
    trigger('side', [
      state('inactive', style({
        transform: 'translateX(-100%)'
      })),
      state('active', style({
        transform: 'translateX(0)'
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ]),
    trigger('top', [
      state('inactive', style({
        transform: 'translateY(-100%)'
      })),
      state('active', style({
        transform: 'translateY(0)'
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('200ms ease-out'))
    ]),
  ]
})
export class CompetitionsPanelComponent implements OnInit {

  protected competitions$: Observable<Competition[]>;
  protected displayed = true;

  constructor(private store: StoreService,
              private responsive: ResponsiveService,
              private router: Router) {
    // check responsive
    if (!this.responsive.isFull()) {
      this.displayed = this.router.url == '/';
    }
  }

  ngOnInit() {
    // subscribe competitions$
    this.competitions$ = this.store.select('data/competitions');
  }

  getCompetitionName(league: string): string {
    return Competition.getName(league);
  }

  hide() {
    if (!this.responsive.isFull()) {
      this.displayed = false;
    }
  }

}