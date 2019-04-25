/**
 * Create ResultItem.
 * @author andre@orefjard.com (André Orefjärd)
 */

import './result-item.less';

const ResultItem = (props, index) =>
    `<li class="result-item result-item-${index}" data-index="${index}" data-symbol="${props.symbol}" role="presentation">
        <div class="result-option l-r-padding-0" role="option">
            <p>${props.symbol} (${props.name})</p>
        </div>
     </li>`;

export default ResultItem;
