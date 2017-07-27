import { XmlPage } from './app.po';

describe('xml App', () => {
  let page: XmlPage;

  beforeEach(() => {
    page = new XmlPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
