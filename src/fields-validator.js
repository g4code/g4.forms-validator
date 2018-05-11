"use strict";

module.exports =  class FieldsValidator {

    empty(value)
    {
        return value.length <= 0;
    }

    minLength(value, minLength)
    {
        return minLength > value.length;
    }

    maxLength(value, maxLength)
    {
        return value.length > maxLength;
    }

    beforeDate(year, month, day)
    {
        let expirationDay = day || 1;
        let expirationDate = new Date(year, month, expirationDay);
        let currentDate = new Date();
        return expirationDate.getTime() <= currentDate.getTime();
    }

    validateEmail(value)
    {
        let emailRegEx =  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return !emailRegEx.test(value);
    }

    isNotChecked(field)
    {
        return !field.checked;
    }

    isDateInFuture(value)
    {
        let birthDate = new Date(value);
        return new Date() < new Date(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    }

    isNotEqual(firtsValue, secondValude)
    {
        return firtsValue !== secondValude;
    }

    username(value)
    {
        let regularExpression = /[\~\!\@\#\$\%\&\*\(\)\{\}\[\]\\\|\/\?\>\<]/;
        return value.search(regularExpression) != -1 ||
            /^(_)\1/.test(value) ||
            /^(-)\1/.test(value);
    }

    startWithDigit(value)
    {
        return /^\d/.test(value);
    }
}