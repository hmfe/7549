/**
 * Create SearchHistory.
 * @author andre@orefjard.com (André Orefjärd)
 */

import './search-history.less';
import HMComponent from '../components/HMComponent.js';
import {store} from '../store/Store.js';
import {actions} from '../store/Actions.js';
import ListResult from '../list-result/ListResult.js';
import HistoryItem from '../list-result/history-item/HistoryItem.js';

class SearchHistory extends HMComponent {

    constructor(el) {
        super(el, {
            id: 'SearchHistory',
            events: {
                clearHistoryBtn: '.clear-history-btn',
                historyItem: '.history-item .history-option',
                deleteItem: '.history-item .delete-item'
            }
        });
        store.connect(this);
    }

    static onDeleteItem(symbol) {
        store.executeAction(actions.CLEAR_SAVED_HISTORY_ITEM, symbol);
    }

    static onSelectedItem(symbol) {
        store.executeAction(actions.SELECT_HISTORY_ITEM, symbol);
    }

    static onDeleteHistory() {
        store.executeAction(actions.CLEAR_SAVED_HISTORY);
    }

    setupEventHandlers(rootView) {
        const clearHistoryBtn = rootView.querySelector(this.events.clearHistoryBtn),
            historyItems = rootView.querySelectorAll(this.events.historyItem),
            deleteItems = rootView.querySelectorAll(this.events.deleteItem);

        clearHistoryBtn.onclick = (evt) => SearchHistory.onDeleteHistory();
        historyItems.forEach((historyItem) => historyItem.onclick = (evt) => SearchHistory.onSelectedItem(evt.currentTarget.dataset.symbol));
        deleteItems.forEach((deleteItem) => deleteItem.onclick = (evt) => SearchHistory.onDeleteItem(evt.currentTarget.dataset.symbol));
    }

    onStateChange(props) {
        (props.prevState !== props.nextState) && this.render();
    }

    render() {
        const state = store.getState(),
            storedSearchList = state.storedSearchList || [];

        return super.render(
            `${storedSearchList.length ? `<div class="search-history">
                <div class="search-history-header">
                    <h1>Search history</h1><a href="#" class="clear-history-btn" role="button">Clear search history</a>
                </div>           
                ${
                ListResult({
                    list: storedSearchList,
                    displayDeleteBtn: true,
                    item: (props, index, displayDeleteBtn) => HistoryItem(props, index, displayDeleteBtn)
                })
                }
              </div>` : ''}`
        );
    }

    onRendered(rootView, domNode) {
        domNode && this.setupEventHandlers(rootView);
    }

    destroy() {
        store.disconnect(this);
    }
}

export default SearchHistory;

