# Deployment runbook

## Before you start
- A Power Platform environment with Dataverse.
- Permission to create a solution, tables, columns, forms, views, and cloud flows.
- Visual Studio with .NET Framework developer targeting pack, and the Dataverse plug-in registration tooling.
- A development solution; do not experiment in production.

## Build and deploy sequence
1. Create publisher `Northwind Service Operations`, prefix `nso`.
2. Create solution `Enterprise Service Operations`.
3. Build tables/columns/choices/relationships in `docs/data-model.md`.
4. Create forms, views, and model-driven app.
5. Add `src/javascript/case-form.js` as a JavaScript web resource. Register OnLoad and OnSave handlers on the Service Case main form; pass execution context.
6. Build the C# plug-in project. Confirm schema names and choice values match your environment.
7. Register assembly and plug-in step:
   - Message: `Create`
   - Primary table: `nso_servicecase`
   - Stage: `PreOperation`
   - Mode: `Synchronous`
   - Filtering attributes not applicable for Create.
8. Register a second step:
   - Message: `Update`
   - Primary table: `nso_servicecase`
   - Stage: `PreOperation`
   - Mode: `Synchronous`
   - Filtering attributes: `nso_severity,nso_casestatus`
9. Create cloud flows using `docs/automation-design.md`; use connection references and environment variables.
10. Configure security roles and auditing.
11. Execute all cases in `docs/test-plan.md`.
12. Export an unmanaged solution for source development backup. For managed deployment, use a controlled build/release process and validate dependencies in a test environment.
13. Record screenshots in `docs/screenshots/` only after actually building and testing the environment. Never add fabricated screenshots.

## Release checklist
- [ ] No secrets or personal/customer data in Git
- [ ] Plug-in steps and images reviewed
- [ ] Schema names and choice values verified
- [ ] Cloud flows turned on and owner/connection reviewed
- [ ] Security roles tested with non-admin accounts
- [ ] Test plan passed
- [ ] Solution checker findings reviewed
- [ ] Rollback / restore plan documented
