"use strict";

(function() {

    class FormsErrors {

        constructor (fieldSelector) {
            this.formSelector = fieldSelector
        }

        addError (message, fieldName) {
            let field = this.getField(this.formSelector, fieldName)
            if(field === null) {
                console.log(`Error: While createing Error. Field ${ fieldName } not exist.`);
                return false;
            }
            field.parentNode.classList.add('has_error');
            let spanTag = document.createElement("span");
            spanTag.classList.add('js_error_message');
            spanTag.classList.add('error_message');
            spanTag.innerHTML = message;
            field.parentNode.insertBefore(spanTag, field.previousSibling);
        }

        getField (formSelector, fieldName) {
            let selector = `${ formSelector } [name="${ fieldName }"]`;
            return document.querySelector(selector);
        }
    }

    if ((typeof module != 'undefined') && (module.exports)) { // Node Module

        module.exports = FormsErrors;

    }
    else if (typeof window != 'undefined') { // Fall back to attaching to window

        window.G4 = typeof G4 != "undefined" ? G4 : {};
        window.G4.FormsErrors = FormsErrors;

    };

}).call(this);