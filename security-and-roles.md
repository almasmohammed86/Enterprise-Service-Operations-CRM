# Security and roles

Apply least privilege. These are design recommendations; verify actual privileges and business-unit scope in your environment.

| Capability | Service Agent | Service Manager | Integration User |
|---|---|---|---|
| Read Accounts/Contacts | Business unit | Organization | Organization (minimum required) |
| Create/read/update Service Cases | User/BU as needed | Organization | Organization (API integration scope) |
| Delete Service Cases | None | Limited / Organization by policy | None |
| Read Service Assets | Business unit | Organization | Organization |
| Update Entitlements | None | Organization | Read-only unless required |
| Read Integration Logs | User/BU | Organization | Organization |
| Create Integration Logs | User | Organization | Organization |
| Customize / publish | None | None | None |

## Additional controls
- Use field security profiles for sensitive integration diagnostics if they can contain personal or confidential data.
- Enable auditing on status, severity, SLA target, escalation, and customer lookup columns where required.
- Use a dedicated application user for integrations, not a named employee account.
- Store secrets in a supported secret store; never commit client secrets or access tokens.
- Restrict deletion of Integration Logs and use retention policies.
- Add manager approval for manual SLA overrides if the business requires it.
