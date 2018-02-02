import { GameclientPage } from './app.po';

describe('gameclient App', () => {
  let page: GameclientPage;

  beforeEach(() => {
    page = new GameclientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
