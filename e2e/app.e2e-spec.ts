import { Ng2FootballApiPage } from './app.po';

describe('ng2-football-api App', function() {
  let page: Ng2FootballApiPage;

  beforeEach(() => {
    page = new Ng2FootballApiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
