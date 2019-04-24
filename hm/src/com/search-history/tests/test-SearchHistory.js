/**
 * Create SearchHistory test.
 * @author andre@orefjard.com (André Orefjärd)
 */

import 'jsdom-global/register'
import 'chai/register-should';
import SearchHistory from '../SearchHistory.js';
import {utils} from '../../utils/Utils.js';

describe('com.search-history', function() {
    describe('SearchHistory', function() {

        let sut;
        beforeEach(function() {
            global.DOMParser = window.DOMParser;
            global.localStorage = {
                getItem: () => {},
                setItem: () => {}
            };
            document.body.innerHTML = '<div class="comp-search-history"></div>';
        });

        afterEach(function() {
            sut = global.localStorage = global.DOMParser = null;
        });

        it('should render SearchHistory', function() {
            sut = new SearchHistory('.comp-search-history');
            debugger
            const expected = `<section class="comp-search-box"><div class="search-box"><form><input type="text" name="q" required="" class="search-field rounded-corners" placeholder="Search for a ticker" value="" autocomplete="off" spellcheck="false" minlength="1" maxlength="100" data-autocomplete-disabled="false" aria-label="Search ticker"><button class="reset-search-btn" type="reset" aria-label="reset search"></button></form><div class="comp-search-history"></div></div></section>`;
            //(utils.trim(sut.view.innerHTML)).should.equal(utils.trim(expected));
        });
    });
});


