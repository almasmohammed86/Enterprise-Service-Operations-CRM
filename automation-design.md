# Power Automate designs

These are implementation specifications rather than exported cloud-flow packages. Build them in your own solution and use connection references.

## Flow 01 — SLA Warning and Escalation
**Purpose:** Alert the owner/manager when an active case has reached its SLA target.

1. Create an automated cloud flow inside the solution.
2. Trigger: Dataverse — When a row is added, modified or deleted.
   - Change type: Added or Modified
   - Table: Service Cases (`nso_servicecase`)
   - Scope: Organization
   - Select columns (for modification): `nso_slatarget,nso_casestatus,nso_escalated,nso_severity`
3. Add a condition: SLA Target is not empty AND Case Status is not Resolved AND Case Status is not Cancelled AND Escalated is No.
4. Compare SLA Target with `utcNow()` using a safe date expression. If due or overdue:
   - Update row: Escalated = Yes.
   - Send email or Teams notification to case owner and service manager.
   - Include case number, subject, severity, account, SLA target, and a link to the record.
5. Add a trigger condition or a guard condition to avoid repeated notifications after Escalated becomes Yes.
6. Configure run-after handling for failed actions and log a concise, redacted failure to Integration Log if appropriate.
7. Turn the flow on and test with an overdue active case.

**Production note:** Use a scheduled flow or native Customer Service SLA KPI actions if warning windows, business hours, holidays, or pause/resume logic are required.

## Flow 02 — Integration Failure Alert
**Purpose:** Notify operations when an Integration Log row is created with Result = Failed.

1. Automated cloud flow, Dataverse trigger on Integration Logs (`nso_integrationlog`), Added.
2. Condition: Result equals Failed (`100000002` in this sample choice design).
3. Send an email or Teams message to the operations support mailbox.
4. Include Correlation ID, Source, Operation, response summary, and related case if present.
5. Do not include access tokens, full payment details, passwords, or unnecessary personal data.
6. Add a failure branch for the notification itself; consider a separate monitoring channel for repeated alert failures.
