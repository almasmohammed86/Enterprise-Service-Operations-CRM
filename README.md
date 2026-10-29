# Form JavaScript setup

1. Add `case-form.js` as a JavaScript web resource in the solution.
2. Open the Service Case main form.
3. Add the library.
4. On the form's **On Load** event, add function `NSO.CaseForm.onLoad` and check **Pass execution context as first parameter**.
5. On the form's **On Save** event, add `NSO.CaseForm.onSave` and check **Pass execution context as first parameter**.
6. Save and publish.
7. Test both a valid and invalid record.

JavaScript is for immediate UX feedback. The C# plug-in remains the server-side enforcement layer for API/import callers.
