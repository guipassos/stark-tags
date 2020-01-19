import {VisitorsPage} from './visitors.po';
import {browser} from 'protractor';

describe('Visitor Form test', () => {
  let page: VisitorsPage;

  beforeEach(() => {
    page = new VisitorsPage();
    page.navigateTo();
  });

  it('Empty visitor list', () => {
    let alert = page.getEmplyAlert().getText();
    expect(alert).toContain('No registered visitors');
  });

  // it('Get first visitor from list when list is not empty', () => {
  //   let visitorId = page.getFirstVisitorId().getText();
  //   expect(visitorId).not.toBeNull();
  // });

});
