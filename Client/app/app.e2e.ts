import { browser, by, element } from 'protractor';

describe('App', () => {

    beforeEach(() => {
        browser.get('/');
    });

    it('should have a title', () => {
        const subject = browser.getTitle();
        // title is replaced using translation text set in DB as 'Site title'
        const result = 'Site title';
        expect(subject).toEqual(result);
    });

});
