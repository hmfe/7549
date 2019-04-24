/**
 * Create Store test.
 * @author andre@orefjard.com (André Orefjärd)
 */

import 'jsdom-global/register'
import 'chai/register-should';
import {actions} from '../Actions.js';
import {store} from '../Store.js';

describe('com.store', function() {
    describe('Store', function() {

        beforeEach(function() {
            global.DOMParser = window.DOMParser;
            global.localStorage = {
                getItem: () => {},
                setItem: () => {}
            };
        });
        afterEach(function() {
            global.DOMParser = global.localStorage = null;
        });

        it('should initialize store', function() {

            const expected = {
                prevState:{
                    currentKeyword: "",
                    searchResultList:[],
                    selectedItem: false,
                    storedSearchList: []
                },
                nextState: {currentKeyword: "",
                    searchResultList: [],
                    selectedItem: false,
                    storedSearchList: []
                }
            };
            JSON.stringify(store.executeAction(actions.INITIALIZE)).should.equal(JSON.stringify(expected))
        });

    });
});
