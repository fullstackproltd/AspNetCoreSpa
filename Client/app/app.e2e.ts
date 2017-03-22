import { browser } from 'protractor';

describe('App', () => {

    beforeEach(() => {
        browser.get('/');
    });

    it('should have a title', () => {
        browser.getTitle().then((webpageTitle) => {
            // title is replaced using translation text set in DB as 'Site title'
            expect(webpageTitle).toEqual('Site title');
        });
    });

});
