import { Component, OnInit } from '@angular/core';
import { StoreService } from "../../core/store.service";
import { Observable } from "rxjs";
import { Competition } from "../../core/models/competition.model";

@Component({
  selector: 'home-home-page',
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  constructor(private store: StoreService) {
    console.log('store', this.store.state);
  }

  ngOnInit() {
    this.store.data.fetchCompetitions().subscribe(state => {
      console.log('state', state);
    });
  }

}