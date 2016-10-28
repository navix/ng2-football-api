import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from "rxjs";

import { Competition } from "../../core/models/competition.model";
import { StoreService } from "../../core/store.service";
import { Router } from "@angular/router";

@Component({
  selector: 'home-competitions-panel',
  templateUrl: 'competitions-panel.component.html',
  styleUrls: ['competitions-panel.component.scss'],
  host: {
    '(document:mouseup)': 'displayResponsive = false',
  },
})
export class CompetitionsPanelComponent implements OnInit {

  protected competitions$: Observable<Competition[]>;

  @HostBinding('class.-display-responsive') displayResponsive: boolean = false;

  constructor(private store: StoreService,
              private router: Router) {
  }

  ngOnInit() {
    // subscribe competitions$
    this.competitions$ = this.store.select('data/competitions');
    // check is home page for responsive
    if (this.router.url == '/') {
      this.displayResponsive = true;
    }
  }

  getCompetitionName(league: string): string {
    return Competition.getName(league);
  }

}