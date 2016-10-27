import { Component, Input } from "@angular/core";
import { TableStanding } from "../../core/models/table.model";

@Component({
  selector: 'home-league-table',
  templateUrl: 'league-table.component.html',
  styleUrls: ['league-table.component.scss'],
})
export class LeagueTableComponent {

  @Input() table: TableStanding;

} 