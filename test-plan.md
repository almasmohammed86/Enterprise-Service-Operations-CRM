# Test plan

Use a development environment and synthetic data only.

| ID | Scenario | Expected result |
|---|---|---|
| TC-001 | Create case with blank Subject | Form blocks save; server rejects invalid API create |
| TC-002 | Create case without Account | Form blocks save; server rejects create |
| TC-003 | Create Critical case | SLA target is calculated to 4 calendar hours from creation |
| TC-004 | Create High case | SLA target is calculated to 8 calendar hours from creation |
| TC-005 | Create Normal case | SLA target is calculated to 24 calendar hours from creation |
| TC-006 | Create Low case | SLA target is calculated to 72 calendar hours from creation |
| TC-007 | Change severity on existing case | SLA target recalculated on update |
| TC-008 | Resolve case | SLA escalation flow does not escalate it |
| TC-009 | Active case is overdue and not escalated | Flow marks Escalated = Yes and notifies manager |
| TC-010 | Integration Log Result = Failed | Operations alert is sent |
| TC-011 | Integration Log Result = Succeeded | Failure alert is not sent |
| TC-012 | Integration user tries to delete a case | Delete denied by security role |
| TC-013 | API request repeats external correlation ID | Integration layer detects duplicate / follows idempotency policy |
| TC-014 | Notification action fails | Failure is visible in flow run history; no sensitive payload is exposed |
| TC-015 | Agent opens manager-only data | Access is denied according to role configuration |

## Test data
Create fictional account `Contoso Demo Ltd`, contact `Demo Contact`, and asset `ASSET-DEMO-001`. Never use real customer data in screenshots or commits.
