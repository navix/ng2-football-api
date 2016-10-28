import { Fixture } from "./fixture.model";
import { Table } from "./table.model";

export class Competition {

  id: number = null;
  caption: string = null;
  league: string = null;
  year: string = null;
  currentMatchday: number = null;
  numberOfMatchdays: number = null;
  numberOfTeams: number = null;
  numberOfGames: number = null;
  lastUpdated: Date = null;

  fixtures: Fixture[] = [];
  table: Table = null;

  static getName(league: string) {
    let names = {
      'PL': 'Premier League',
      'ELC': 'Championship',
      'EL1': 'League One',
      'BL1': '1. Bundesliga',
      'BL2': '2. Bundesliga',
      'DED': 'Eredivisie',
      'FL1': 'Ligue 1',
      'FL2': 'Ligue 2',
      'PD': 'Primera Division',
      'SD': 'Liga Adelante',
      'SA': 'Serie A',
      'PPL': 'Primeira Liga',
    };
    return names[league] || league;
  }

  static isAvailable(competition: Competition) {
    return ['PL', 'ELC', 'EL1', 'BL1', 'BL2', 'DED', 'FL1', 'FL2', 'PD', 'SD', 'SA', 'PPL'].indexOf(competition.league) !== -1;
  }

}