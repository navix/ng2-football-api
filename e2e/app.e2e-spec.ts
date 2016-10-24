import { Ng2soccerPage } from './app.po';

describe('ng2soccer App', function() {
  let page: Ng2soccerPage;

  beforeEach(() => {
    page = new Ng2soccerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
