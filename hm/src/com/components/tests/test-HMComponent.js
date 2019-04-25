/**
 * Create HMComponent test.
 * @author andre@orefjard.com (André Orefjärd)
 */

import 'jsdom-global/register'
import 'chai/register-should';
import HMComponent from '../HMComponent.js';
import {utils} from '../../utils/Utils.js';

describe('com.components', function() {
    describe('HMComponent', function() {

        let sut;
        beforeEach(function() {
            global.DOMParser = window.DOMParser;
            document.body.innerHTML = '<div class="comp-hm-component"></div>';
        });

        afterEach(function() {
            sut = global.localStorage = global.DOMParser = null;
        });

        it('should render HMComponent', function() {
            const expected = `<div>HMComponent</div>`;
            sut = new HMComponent('.comp-hm-component');
            sut.render(expected, sut.view);

            (utils.trim(sut.view.innerHTML)).should.equal(utils.trim(expected));
        });

    });
});


