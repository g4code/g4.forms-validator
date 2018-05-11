"use strict";

module.exports = class FormValidator {

    constructor (formSelector) {
        this.formSelector = formSelector
        this.fieldRules = []
        this.isValidFields = true
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
            return false;
        }
        let fieldValue = fieldEl.value
        let hasError = rule.rule.call(this, fieldValue)
        if(hasError){
            this.isValidFields = false
            rule.error.call(this, fieldValue)
        }
    }

    resetErrors() {
        this.isValidFields = true
        document.querySelectorAll(this.formSelector + ' .js_error_message').forEach(function(element) {
            element.remove()
        });
    }

}