export interface Table {
  leagueCaption: string;
  matchday: number;
  standing: TableStanding[];
}

export interface TableStanding extends TableStandingForm {
  away: TableStandingForm;
  crestURI: string;
  goalDifference: number;
  home: TableStandingForm;
  playedGames: number;
  points: number;
  position: number;
  teamName: string;
}

export interface TableStandingForm {
  draws: number;
  goals: number;
  goalsAgainst: number;
  losses: number;
  wins: number;
}