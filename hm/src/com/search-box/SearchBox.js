/**
 * Create SearchBox.
 * @author andre@orefjard.com (André Orefjärd)
 */

import './search-box.less';
import HMComponent from '../components/HMComponent.js';
import {store} from '../store/Store.js';
import {actions} from '../store/Actions.js';
import ListResult from '../list-result/ListResult.js';
import ResultBox from '../list-result/result-box/ResultBox.js';
import SearchHistory from '../search-history/SearchHistory.js';

let delayTimeoutId = null;
const delayCall = (callback, ttw) => {
    delayTimeoutId && clearTimeout(delayTimeoutId) && (delayTimeoutId = null);
    delayTimeoutId = setTimeout(() => {
        delayTimeoutId = null;
        callback();
    }, (!delayTimeoutId ? 200 : ttw));
};

const ENTER_KEY = 13;

const resetFocus = (searchField, store) => {
    if (store.getState().currentKeyword && !store.getState().selectedItem) {
        searchField.selectionStart = searchField.selectionEnd = searchField.value.length;
        searchField.focus();
    }
};

class SearchBox extends HMComponent {

    constructor(el) {
        super(el, {
            id: 'SearchBox',
            events: {
                searchField: '.search-field',
                resetSearchBtn: '.reset-search-btn',
                resultItem: '.search-suggestions .list-box .result-item'
            }
        });
        store.connect(this);
    }

    static onSearch(keyword) {
        keyword
            ? store.executeAction(actions.SYMBOL_SEARCH, keyword)
            : store.executeAction(actions.RESET_SEARCH_KEY_AND_SEARCH_RESULT);
    }

    static onSelectedItem(index) {
        store.executeAction(actions.SELECT_AND_SAVE_ITEM, index);
    }

    setupEventHandlers(rootView) {
        const searchField = rootView.querySelector(this.events.searchField),
            resetSearchBtn = rootView.querySelector(this.events.resetSearchBtn),
            resultItems = rootView.querySelectorAll(this.events.resultItem);

        resetFocus(searchField, store);

        resultItems.forEach((resultItem) => resultItem.onclick = (evt) => {
            searchField.blur();
            SearchBox.onSelectedItem(evt.currentTarget.dataset.index);
        });
        resetSearchBtn.onclick = (evt) => store.executeAction(actions.RESET_SEARCH_KEY_AND_SEARCH_RESULT);
        searchField.oninput = (evt) => this.onInputChange(evt.currentTarget.value);
        searchField.onkeypress = (evt) => (evt.keyCode !== ENTER_KEY && this.onInputChange(evt.currentTarget.value));
    }

    onInputChange(value) {
        store.updateState(actions.SET_SEARCH_KEY, value);
        delayCall(() => SearchBox.onSearch(store.getState().currentKeyword), 1000);
    }

    onStateChange(props) {
        (props.prevState !== props.nextState) && this.render();
    }

    render() {

        const state = store.getState(),
            resultList = state.searchResultList || [],
            currentKeyword = state.currentKeyword || '';

        return super.render(
            `<div class="search-box">
                <form>
                    <input 
                        type="text" 
                        name="q" 
                        required 
                        class="search-field ${state.selectedItem ? 'rounded-corners' : (resultList.length ? 'rounded-top-corners' : 'rounded-corners')}" 
                        placeholder="Search for a ticker" 
                        value="${currentKeyword}" 
                        autocomplete="off" 
                        spellcheck="false" 
                        minlength="1" 
                        maxlength="100" 
                        data-autocomplete-disabled="false" 
                        aria-label="Search ticker"
                    />
                    <button class="reset-search-btn" type="reset" aria-label="reset search"></button>
                    ${ListResult({list: resultList, class: 'search-suggestions', selectedItem: state.selectedItem})}
                </form>
                ${state.selectedItem ? ResultBox(state.selectedItem) : ''}
                <div class="comp-search-history"></div>
              </div>
            `
        );
    }

    onRendered(rootView, domNode) {
        domNode && this.setupEventHandlers(rootView);
        domNode && !this.searchHistory && (this.searchHistory = new SearchHistory('.comp-search-history'));
    }

    destroy() {
        if (this.searchHistory) {
            this.searchHistory.destroy();
            this.searchHistory = null;
        }
    }

}

export default SearchBox;

