export class Fixture {
  id: number;
  awayTeamName: string;
  date: Date;
  homeTeamName: string;
  matchday: number;
  odds: any;
  result: {
    goalsAwayTeam: number;
    goalsHomeTeam: number;
  };
  status: 'SCHEDULED' | 'CANCELED' | 'TIMED' | 'IN_PLAY' | 'POSTPONED' | 'FINISHED';
}