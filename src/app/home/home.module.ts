import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { HomeRoutingModule } from "./home.routing";
import { HomePageComponent } from "./home-page/home-page.component";
import { MainLayoutComponent } from "./main-layout/main-layout.component";
import { CompetitionsPanelComponent } from "./competitions-panel/competitions-panel.component";
import { CompetitionPageComponent } from "./competition-page/competition-page.component";
import { FetchCompetitionsResolver } from "./fetch-competitions.resolver";
import { FetchFixturesResolver } from "./fetch-fixtures.resolver";
import { FetchTableResolver } from "./fetch-table.resolver";
import { FixtureLineComponent } from "./fixture-line/fixture-line.component";
import { LeagueTableComponent } from "./league-table/league-table.component";
import { MatchTimePipe } from "./match-time.pipe";
import { MatchDatePipe } from "./match-date.pipe";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  exports: [],
  declarations: [
    MainLayoutComponent,
    CompetitionsPanelComponent,
    HomePageComponent,
    CompetitionPageComponent,
    FixtureLineComponent,
    LeagueTableComponent,
    MatchDatePipe,
    MatchTimePipe,
  ],
  providers: [
    FetchCompetitionsResolver,
    FetchFixturesResolver,
    FetchTableResolver,
  ],
})
export class HomeModule {
}
