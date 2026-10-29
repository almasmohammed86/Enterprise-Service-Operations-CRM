/* global Xrm */
var NSO = window.NSO || {};

NSO.CaseForm = (function () {
    "use strict";

    var notificationId = "NSO_CASE_VALIDATION";

    function onLoad(executionContext) {
        var formContext = executionContext.getFormContext();
        validate(executionContext);

        var severity = formContext.getAttribute("nso_severity");
        if (severity) {
            severity.addOnChange(function () {
                validate(executionContext);
            });
        }
    }

    function onSave(executionContext) {
        validate(executionContext);
        var formContext = executionContext.getFormContext();
        var subject = formContext.getAttribute("nso_subject");
        var account = formContext.getAttribute("nso_accountid");

        if (!subject || !subject.getValue() ||
            !String(subject.getValue()).trim() ||
            !account || !account.getValue()) {
            executionContext.getEventArgs().preventDefault();
            formContext.ui.setFormNotification(
                "Enter a Subject and select a Customer Account before saving.",
                "ERROR",
                notificationId
            );
        }
    }

    function validate(executionContext) {
        var formContext = executionContext.getFormContext();
        var subject = formContext.getAttribute("nso_subject");
        var account = formContext.getAttribute("nso_accountid");

        if (!subject || !subject.getValue() ||
            !String(subject.getValue()).trim() ||
            !account || !account.getValue()) {
            formContext.ui.setFormNotification(
                "Subject and Customer Account are required.",
                "WARNING",
                notificationId
            );
        } else {
            formContext.ui.clearFormNotification(notificationId);
        }
    }

    return {
        onLoad: onLoad,
        onSave: onSave
    };
})();
