"use strict";

(function() {

    class Rule {

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

    if ((typeof module != 'undefined') && (module.exports)) { // Node Module

        module.exports = Rule;

    }
    else if (typeof window != 'undefined') { // Fall back to attaching to window

        window.G4 = typeof G4 != "undefined" ? G4 : {};
        window.G4.Rule = Rule;

    };

}).call(this);