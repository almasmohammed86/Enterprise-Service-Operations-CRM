# Dataverse data model

Create the following components inside the `Enterprise Service Operations` solution. Use publisher prefix `nso`. Logical names below are the intended names; Dataverse may append the publisher prefix automatically depending on how you create components. Confirm the final schema names in the maker portal before compiling/registering code.

## Table: Service Case (`nso_servicecase`)
Primary name: `nso_name` (Text, required; e.g. `SC-000123`)

| Column | Type | Required | Notes |
|---|---|---:|---|
| `nso_subject` | Text, 200 | Yes | Short problem summary |
| `nso_description` | Multiline text | No | Full details |
| `nso_accountid` | Lookup → Account | Yes | Customer account |
| `nso_contactid` | Lookup → Contact | No | Requester |
| `nso_assetid` | Lookup → Service Asset | No | Product / asset |
| `nso_severity` | Choice | Yes | Critical=100000000, High=100000001, Normal=100000002, Low=100000003 |
| `nso_casecategory` | Choice | Yes | Incident=100000000, Request=100000001, Question=100000002 |
| `nso_casestatus` | Choice | Yes | New=100000000, In Progress=100000001, Waiting on Customer=100000002, Resolved=100000003, Cancelled=100000004 |
| `nso_slatarget` | Date and Time | No | Calculated by plug-in on create / severity change |
| `nso_escalated` | Yes/No | Yes | Default No |
| `nso_externalcorrelationid` | Text, 100 | No | External idempotency/correlation key |
| `nso_lastintegrationstatus` | Choice | No | Not Sent=100000000, Succeeded=100000001, Failed=100000002 |
| `nso_integrationmessage` | Multiline text | No | Last error summary |

## Table: Service Asset (`nso_serviceasset`)
Primary name: `nso_name` (Text, required)

| Column | Type | Required | Notes |
|---|---|---:|---|
| `nso_assetnumber` | Text, 100 | Yes | Enable alternate key if unique |
| `nso_accountid` | Lookup → Account | Yes | Owning customer |
| `nso_productname` | Text, 200 | No | Product/model |
| `nso_warrantyenddate` | Date only | No | Warranty end |
| `nso_assetstatus` | Choice | Yes | Active=100000000, Inactive=100000001 |

## Table: Entitlement (`nso_entitlement`)
Primary name: `nso_name` (Text, required)

| Column | Type | Required | Notes |
|---|---|---:|---|
| `nso_accountid` | Lookup → Account | Yes | Covered customer |
| `nso_supportlevel` | Choice | Yes | Standard=100000000, Premium=100000001, Mission Critical=100000002 |
| `nso_effectivestart` | Date only | Yes | Start of coverage |
| `nso_effectiveend` | Date only | No | Blank means no configured end |
| `nso_active` | Yes/No | Yes | Default Yes |

## Table: Integration Log (`nso_integrationlog`)
Primary name: `nso_name` (Text, required)

| Column | Type | Required | Notes |
|---|---|---:|---|
| `nso_correlationid` | Text, 100 | Yes | External correlation id |
| `nso_source` | Text, 100 | Yes | Name of calling system |
| `nso_operation` | Text, 100 | Yes | CreateCase, UpdateCase, etc. |
| `nso_result` | Choice | Yes | Started=100000000, Succeeded=100000001, Failed=100000002 |
| `nso_requestsummary` | Multiline text | No | Redacted request summary only |
| `nso_responsesummary` | Multiline text | No | Redacted response/error |
| `nso_servicecaseid` | Lookup → Service Case | No | Related case |

## Relationships
- Account 1:N Service Cases
- Contact 1:N Service Cases
- Service Asset 1:N Service Cases
- Account 1:N Service Assets
- Account 1:N Entitlements
- Service Case 1:N Integration Logs (optional; the log may exist before a case is created)

## Forms, views, and app
Create a main form with sections:
1. Case Summary: Name, Subject, Status, Severity, Category, Escalated
2. Customer: Account, Contact
3. Service Context: Asset, SLA Target
4. Integration: External Correlation ID, Last Integration Status, Integration Message

Create views:
- My Active Cases (owner = current user; status not Resolved/Cancelled)
- Critical / High Priority (severity Critical or High; active)
- SLA at Risk (SLA Target today or earlier; active)
- Cases with Integration Failures (Last Integration Status = Failed)

Create a model-driven app named `Service Operations Workspace` and add the tables, views, and dashboards.
