/**
 * Create Utils.
 * @author andre@orefjard.com (André Orefjärd)
 */

const parser = (domstring) => Array.from(new DOMParser().parseFromString(domstring, 'text/html').body.childNodes);
const trim = (str) => str.replace(/\r?\n|\r/g, '').replace(/\>[\t ]+\</g, '><');
const trimKey = (key) => key.replace(/[\d\.]+ /, '');
const lightSanitize = (s) => (s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;'));

export const utils = {
    parser: parser,
    trim: trim,
    trimKey: trimKey,
    lightSanitize: lightSanitize
};
