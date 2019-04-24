/**
 * Create HistoryItem.
 * @author andre@orefjard.com (André Orefjärd)
 */

import './history-item.css';

const HistoryItem = (props, index, displayDeleteBtn) =>
    `<li class="history-item history-item-${index}" data-index="${index}" role="presentation">
        <div class="saved-history-items">
            <p class="saved-history-item history-option" data-symbol="${props.symbol}">${props.symbol} (${props.name})</p>
            <p class="saved-history-item time-stamp flex-item-align-right">${props.timeStamp}</p>
            ${displayDeleteBtn ? `<div class="saved-history-item w-100">
                <button class="delete-item" data-symbol="${props.symbol}">Delete</button>
            </div>` : ''}
        </div>
     </li>`;

export default HistoryItem;
