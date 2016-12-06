import { DevfubPage } from './app.po';

describe('devfub App', function() {
  let page: DevfubPage;

  beforeEach(() => {
    page = new DevfubPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
