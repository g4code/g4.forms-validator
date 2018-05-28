"use strict";

(function() {

    class FormValidator {

        constructor (formSelector) {
            this.formSelector = formSelector
            this.fieldRules = []
            this.invalidFields = []
            this.isValidFields = true
            this.oneRuleError = true
        }

        addFieldRules (fields) {
            this.fieldRules = fields
            return this
        }

        isValid () {
            this.validate()
            return this.isValidFields
        }

        validate () {
            this.resetErrors()
            for (let fieldKey in this.fieldRules) {
                let rule = this.fieldRules[fieldKey]
                this.executeSingleRule(rule)
            }
        }

        getField (formSelector, fieldName) {
            let selector = `${ formSelector } [name="${ fieldName }"]`;
            return document.querySelector(selector);
        }

        executeSingleRule (rule) {
            let fieldEl = this.getField(this.formSelector, rule.fieldSelector)

            if (fieldEl === null) {
                console.log(`Error: Field ${ rule.fieldSelector } not exist`);
                return false
            }

            if (this.oneRuleError && this.ifFieldAlreadyHasError(rule.fieldSelector)) {
                return false
            }

            let fieldValue = fieldEl.value
            if(rule.rule.call(this, fieldValue)){
                this.isValidFields = false
                this.invalidFields.push(rule.fieldSelector)
                rule.error.call(this, fieldValue)
            }
        }

        resetErrors() {
            this.isValidFields = true
            document.querySelectorAll(this.formSelector + ' .js_error_message').forEach(function(element) {
                element.remove()
            });
        }

        ifFieldAlreadyHasError (fieldName) {
            let res = this.invalidFields.find( name => {return name === fieldName})
            return  res != undefined
        }

        enableAllRulesErrors () {
            this.oneRuleError = false
            return this
        }

    }

    if ((typeof module != 'undefined') && (module.exports)) { // Node Module

        module.exports = FormValidator;

    }
    else if (typeof window != 'undefined') { // Fall back to attaching to window

        window.G4 = typeof G4 != "undefined" ? G4 : {};
        window.G4.FormValidator = FormValidator;

    };

}).call(this);