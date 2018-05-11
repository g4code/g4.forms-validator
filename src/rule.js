"use strict";

module.exports = class Rule {

    constructor (selector) {
        this.fieldSelector = selector
    }

    addRule (ruleCb) {
        this.rule = ruleCb
        return this
    }

    addError (errorCb) {
        this.error = errorCb
        return this
    }
}