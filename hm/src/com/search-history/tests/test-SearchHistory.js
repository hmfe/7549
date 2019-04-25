/**
 * Create SearchHistory test.
 * @author andre@orefjard.com (André Orefjärd)
 */

import 'jsdom-global/register'
import 'chai/register-should';
import sinon from 'sinon';
import SearchHistory from '../SearchHistory.js';
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
            document.body.innerHTML = '<div class="comp-search-history"></div>';

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

        it('should render SearchHistory', function() {

            state = {
                currentKeyword: "",
                searchResultList: [],
                selectedItem: false,
                storedSearchList: [
                    {
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
                    }
                ]
            };

            const stubGetState = sinon.stub(store, 'getState');
            stubGetState.callsFake(() => state);
            sut = new SearchHistory('.comp-search-history');
            stubGetState.restore();
            const expected = `<div class="search-history">
                                <div class="search-history-header">
                                    <h1>Search history</h1><a href="#" class="clear-history-btn" role="button">Clear search history</a>
                                </div>           
                                <div class="list-result ">
                                    <ul class="list-box" role="listbox">
                                        <li class="history-item history-item-0" data-index="0" role="presentation">
                                            <div class="saved-history-items">
                                                <p class="saved-history-item history-option" data-symbol="IONS">IONS (Ionis Pharmaceuticals Inc.)</p>
                                                <p class="saved-history-item time-stamp flex-item-align-right">2019-04-24, 10:26 PM</p>
                                                <div class="saved-history-item w-100">
                                                    <button class="delete-item" data-symbol="IONS">Delete</button>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                              </div>`;
            (utils.trim(sut.view.innerHTML)).should.equal(utils.trim(expected));
        });
    });
});


