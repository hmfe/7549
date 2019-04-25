/**
 * Create App.
 * @author andre@orefjard.com (André Orefjärd)
 */

import './app.less';
import SearchBox from '../search-box/SearchBox.js';
import HMComponent from '../components/HMComponent.js';
import {store} from '../store/Store.js';
import {actions} from '../store/Actions.js';

class App extends HMComponent {

    constructor(el) {
        super(el, {
            id: 'App'
        });
        store.executeAction(actions.INITIALIZE);
    }

    render() {
        super.render(
            `<section class="comp-search-box"></section>`
        );
    }

    onAfterRender(rootView, domNode) {
        !this.searchbox && (this.searchbox = new SearchBox('.comp-search-box'));
    }

    destroy() {
        if (this.searchbox) {
            this.searchbox.destroy();
            this.searchbox = null;
        }
    }
}

export default App;

