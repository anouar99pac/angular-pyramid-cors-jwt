import { MainAppNg2Page } from './app.po';

describe('main-app-ng2 App', () => {
  let page: MainAppNg2Page;

  beforeEach(() => {
    page = new MainAppNg2Page();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
