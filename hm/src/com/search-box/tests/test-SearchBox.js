/**
 * Create SearchBox test.
 * @author andre@orefjard.com (André Orefjärd)
 */

import 'jsdom-global/register'
import 'chai/register-should';
import sinon from 'sinon';
import SearchBox from '../SearchBox.js';
import {store} from '../../store/Store.js';
import {utils} from '../../utils/Utils.js';

describe('com.search-box', function() {
    describe('SearchBox', function() {

        let sut,
            state;
        beforeEach(function() {
            global.DOMParser = window.DOMParser;
            global.localStorage = {
                getItem: () => {},
                setItem: () => {}
            };
            document.body.innerHTML = '<div class="comp-search-box"></div>';

            state = {
                currentKeyword: "",
                searchResultList: [],
                selectedItem: false,
                storedSearchList: []
            };
        });

        afterEach(function() {
            sut = state = global.localStorage = global.DOMParser = null;
        });

        it('should render SearchBox', function() {

            sut = new SearchBox('.comp-search-box');
            const expected = `<div class="search-box">
                                <form>
                                    <input type="text" name="q" required="" class="search-field rounded-corners" placeholder="Search for a ticker" value="" autocomplete="off" spellcheck="false" minlength="1" maxlength="100" data-autocomplete-disabled="false" aria-label="Search ticker">
                                    <button class="reset-search-btn" type="reset" aria-label="reset search"></button>
                                </form>
                                <div class="comp-search-history"></div>
                             </div>`;
            (utils.trim(sut.view.innerHTML)).should.equal(utils.trim(expected));
        });

        it('should render SearchBox with a ResultBox', function() {

            state = {
                currentKeyword: "",
                searchResultList: [],
                selectedItem: {
                    currency: 'USD',
                    marketClose: '16:00',
                    marketOpen: '09:30',
                    matchScore: '0.1111',
                    name: 'Ionis Pharmaceuticals Inc.',
                    region: 'United States',
                    symbol: 'IONS',
                    timeStamp: '2019-04-24, 10:26 PM',
                    timezone: 'UTC-04',
                    type: 'Equity'
                },
                storedSearchList: []
            };

            const stubGetState = sinon.stub(store, 'getState');
            stubGetState.callsFake(() => state);
            sut = new SearchBox('.comp-search-box');
            stubGetState.restore();
            const expected = `<div class="search-box"><form><input type="text" name="q" required="" class="search-field rounded-corners" placeholder="Search for a ticker" value="" autocomplete="off" spellcheck="false" minlength="1" maxlength="100" data-autocomplete-disabled="false" aria-label="Search ticker"><button class="reset-search-btn" type="reset" aria-label="reset search"></button></form><div class="result-box"><div class="result-box-item"><p>Stock Ticker: IONS Name: Ionis Pharmaceuticals Inc.</p><p>Market Open: 09:30 Market Close: 16:00</p></div></div><div class="comp-search-history"></div></div>`;
            (utils.trim(sut.view.innerHTML)).should.equal(utils.trim(expected));
        });
    });
});


