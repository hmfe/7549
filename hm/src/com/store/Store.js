/**
 * Create Store.
 * @author andre@orefjard.com (André Orefjärd)
 */

const moment = require('moment');
import {actions} from '../store/Actions.js';
import {utils} from '../utils/Utils.js';

// todo only store a list of ticker symbol instead of the object literal populate the storedSearchList by fetching on initialize
const setLocalStorage = (data, id = 'hm_search_history') => localStorage.setItem(id, JSON.stringify(data));
const getLocalStorage = (id = 'hm_search_history') => localStorage.getItem(id);

const setState = (state = {}, action, actionsParams = {}) => {
    switch (action) {
        case actions.INITIALIZE:

            const storedSearchList = getLocalStorage() || '[]';
            return {
                ...state,
                currentKeyword: '',
                searchResultList: [],
                selectedItem: false,
                storedSearchList: [...JSON.parse(storedSearchList)]
            };
        case actions.SET_SEARCH_KEY:

            if (state.currentKeyword === actionsParams) {
                return state;
            }

            return {
                ...state,
                currentKeyword: utils.lightSanitize(actionsParams.toUpperCase()),
                selectedItem: false
            };
        case actions.RESET_SEARCH_KEY_AND_SEARCH_RESULT:

            return {
                ...state,
                currentKeyword: '',
                searchResultList: [],
                selectedItem: false
            };
        case actions.SELECT_ITEM:

            const selectedItem = (actionsParams || {}).symbol || state.searchResultList[actionsParams];
            return {
                ...state,
                selectedItem: selectedItem,
                currentKeyword: selectedItem.symbol
            };

        case actions.SELECT_HISTORY_ITEM:
            const historyList = [...state.storedSearchList],
                symbol = actionsParams,
                selectedHistoryItem = historyList.filter((sitem) => sitem['symbol'] === symbol)[0];

            if (!selectedHistoryItem) {
                return state;
            }

            return {
                ...state,
                selectedItem: selectedHistoryItem,
                currentKeyword: selectedHistoryItem.symbol
            };

        case actions.SAVE_ITEM:
            const list = [...state.storedSearchList],
                item = {...actionsParams},
                itemInList = list.some((sitem) => sitem['symbol'] === item.symbol);

            if (itemInList) {
                return state;
            }

            item.timeStamp = moment().format('YYYY-MM-DD, h:mm A');
            list.push(item);

            setLocalStorage([...list]);

            return {
                ...state,
                storedSearchList: [...list]
            };
        case actions.CLEAR_SAVED_HISTORY_ITEM:
            const historySearchList = [...state.storedSearchList],
                index = historySearchList.findIndex((sitem) => sitem['symbol'] === actionsParams);
            if (index === -1) {
                return state;
            }
            historySearchList.splice(index, 1);
            setLocalStorage([...historySearchList]);

            return {
                ...state,
                storedSearchList: [...historySearchList]
            };

        case actions.CLEAR_SAVED_HISTORY:
            setLocalStorage([]);
            return {
                ...state,
                storedSearchList: []
            };

        case actions.SET_SEARCH_RESULT_LIST:
            return {
                ...state,
                searchResultList: [...actionsParams.searchResultList]
            };

        default:
            return state;
    }
};

const executeAction = (action, actionsParams) => {
    switch (action) {

        case actions.INITIALIZE:
            return store.updateState(actions.INITIALIZE, actionsParams);

        case actions.SET_SEARCH_KEY:
            return store.updateState(actions.SET_SEARCH_KEY, actionsParams);

        case actions.RESET_SEARCH_KEY_AND_SEARCH_RESULT:
            return store.updateState(actions.RESET_SEARCH_KEY_AND_SEARCH_RESULT, actionsParams);

        case actions.SELECT_AND_SAVE_ITEM:
            const {nextState} = store.updateState(actions.SELECT_ITEM, actionsParams, {omitChange: false});
            return store.updateState(actions.SAVE_ITEM, nextState.selectedItem);

        case actions.CLEAR_SAVED_HISTORY:
            return store.updateState(actions.CLEAR_SAVED_HISTORY, actionsParams);

        case actions.CLEAR_SAVED_HISTORY_ITEM:
            return store.updateState(actions.CLEAR_SAVED_HISTORY_ITEM, actionsParams);

        case actions.SELECT_ITEM:
            return store.updateState(actions.SELECT_ITEM, actionsParams);

        case actions.SELECT_HISTORY_ITEM:
            return store.updateState(actions.SELECT_HISTORY_ITEM, actionsParams);

        case actions.SYMBOL_SEARCH:

            const SYMBOL_SEARCH = 'SYMBOL_SEARCH',
                API_KEY = '7HCHVVMJBQ1VTB2L',
                URL_PATH = 'www.alphavantage.co/query';

            return fetch(`//${URL_PATH}?function=${SYMBOL_SEARCH}&keywords=${actionsParams}&apikey=${API_KEY}`)
                .then((response) => response.json())
                .then((myJson) => {
                    const result = (myJson || {}).bestMatches || [],
                        trimmedResult = result.map((item) => Object.assign(...Object.keys(item).map((key) => ({[utils.trimKey(key)]: item[key]}))));

                    store.updateState(actions.SET_SEARCH_RESULT_LIST, {searchResultList: trimmedResult});
                })
                .catch((error) => console.error('Error:', error));
    }
};

const connectedComponents = [];

const createStore = (state = {}) => {
    return {

        updateState: (action, actionsParams = {}, props = {}) => {
            const nextState = setState(state, action, actionsParams),
                prevState = state;
            if (state !== nextState) {
                state = nextState;
            }
            const retState = {prevState: prevState, nextState: nextState};
            !props.omitChange && connectedComponents.forEach((comp) => comp.onStateChange(retState));
            return retState;
        },
        connect: (component) => {
            (!connectedComponents.includes(component)) && connectedComponents.push(component);
        },
        disconnect: (component) => {
            if (connectedComponents.includes(component)) {
                const index = connectedComponents.findIndex((comp) => comp === component);
                connectedComponents.splice(index, 1);
            }
        },
        executeAction: (action, actionsParams = {}) => {
            return executeAction(action, actionsParams);
        },
        getState: () => state
    };
};

export const store = createStore();


