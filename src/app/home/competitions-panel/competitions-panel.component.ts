import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { Competition } from "../../core/models/competition.model";
import { StoreService } from "../../core/store.service";

@Component({
  selector: 'home-competitions-panel',
  templateUrl: 'competitions-panel.component.html',
  styleUrls: ['competitions-panel.component.scss'],
})
export class CompetitionsPanelComponent implements OnInit {

  protected competitions$: Observable<Competition[]>;

  constructor(private store: StoreService) {
  }

  ngOnInit() {
    this.competitions$ = this.store.select('data/competitions');
  }

  getCompetitionName(league: string): string {
    return Competition.getName(league);
  }

}