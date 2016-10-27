import { Component, Input, Output, EventEmitter } from "@angular/core";
import { TableStanding } from "../../core/models/table.model";

@Component({
  selector: 'home-league-table',
  templateUrl: 'league-table.component.html',
  styleUrls: ['league-table.component.scss'],
})
export class LeagueTableComponent {

  @Input() highlight: string[];
  @Input() table: TableStanding;

  @Output() teamHover = new EventEmitter<string[]>();

  protected isHighlighted(name: string): boolean {
    return this.highlight.indexOf(name) !== -1;
  }

  protected rowEnter(name: string) {
    this.teamHover.emit([name]);
  }

  protected rowLeave() {
    this.teamHover.emit([]);
  }

} 