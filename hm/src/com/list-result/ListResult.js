/**
 * Create ListResult.
 * @author andre@orefjard.com (André Orefjärd)
 */

import './list-result.less';
import ResultItem from './result-item/ResultItem.js';

const ListResult = (props, index) =>

    (!props.selectedItem &&
    props.list.length)
        ? `<div class="${'list-result ' + (props.class ? props.class : '')}">
                <ul class="list-box" role="listbox">
                    ${props.list.map((item, index) => (props.item || ResultItem)(item, index, props.displayDeleteBtn)).join('')}
                </ul>
            </div>`
        : '';

export default ListResult;

