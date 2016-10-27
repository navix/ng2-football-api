import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from "./home-page/home-page.component";
import { MainLayoutComponent } from "./main-layout/main-layout.component";
import { CompetitionPageComponent } from "./competition-page/competition-page.component";
import { FetchCompetitionsResolver } from "./fetch-competitions.resolver";
import { FetchFixturesResolver } from "./fetch-fixtures.resolver";
import { FetchTableResolver } from "./fetch-table.resolver";

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    resolve: {
      fetchData: FetchCompetitionsResolver,
    },
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'competition/:league',
        component: CompetitionPageComponent,
        resolve: {
          fixtures: FetchFixturesResolver,
          table: FetchTableResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {
}
