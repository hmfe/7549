/**
 * Create HMComponent.
 * @author andre@orefjard.com (André Orefjärd)
 */

import {utils} from '../utils/Utils.js';

class HMComponent {

    constructor(el, props) {
        this.el = el;
        this.id = (props || {}).id || {};

        this.view = this.el && document.querySelector(this.el);
        this.events = (props || {}).events || null;

        this.render();
    }

    static parseDom(domString) {
        return utils.parser(domString);
    }

    render(domString, rootView) {

        rootView = rootView
            ? rootView :
            this.view;

        HMComponent.parseDom(domString).map((nextDomNode) => {

            if (((this.domNode || {}).outerHTML !== nextDomNode.outerHTML) && nextDomNode.outerHTML) {

                this.onDestroy(rootView, this.domNode);
                rootView.appendChild(nextDomNode);
                this.domNode = nextDomNode;
            }
        });

        this.onRendered(rootView, this.domNode);
        this.onAfterRender(rootView, this.domNode);

        return this.domNode;
    }

    onDestroy(rootView, domNode) {
        this.destroy(rootView, domNode);
        this.removeChildren(domNode);
    }

    removeChildren(domNode) {
        if (!domNode) {
            return;
        }

        const children = ((domNode || {}).children || []);

        let index = children.length;
        while ((index--)) {
            const node = children[index];
            this.removeChildren(node);
        }

        domNode.onclick = domNode.oninput = null;
        domNode.remove();
        return domNode;
    }

    destroy(rootView, domNode) {
    }

    onRendered(rootView, domNode) {
    }

    onAfterRender(rootView, domNode) {
    }
}

export default HMComponent;