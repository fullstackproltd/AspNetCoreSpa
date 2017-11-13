import { browser } from 'protractor';

describe('App', () => {

    beforeEach(() => {
        browser.get('/');
    });

    it('should have a title', () => {
        browser.getTitle().then((webpageTitle) => {
            expect(webpageTitle).toEqual('AspNetCoreSpa');
        });
    });

});
