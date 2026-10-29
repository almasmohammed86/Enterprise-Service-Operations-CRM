# Upload this project to GitHub (Windows)

## Option A — GitHub website
1. Extract `enterprise-service-operations-crm.zip`.
2. Sign in to GitHub and choose **New repository**.
3. Repository name: `enterprise-service-operations-crm`.
4. Description: `Dynamics 365 CE / Dataverse enterprise service operations CRM reference project`.
5. Choose Public only if you are comfortable making the code public. Do not add another README or license because they are already included.
6. Create repository.
7. Select **Add file → Upload files**.
8. Open the extracted project folder, select its contents (not the outer folder), and drag them into the upload area.
9. Commit message: `Add Enterprise Service Operations CRM reference project`.
10. Click **Commit changes**.

## Option B — Git command line
Install Git, extract the ZIP, open PowerShell in the extracted project folder, and run:

```powershell
git init
git add .
git commit -m "Add Enterprise Service Operations CRM reference project"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/enterprise-service-operations-crm.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. If Git asks for authentication, use GitHub's supported browser sign-in or credential manager. Do not put a password or token in the remote URL.

## Before making the repository public
- Check that no credentials, personal information, customer data, environment URLs, or exported environment-specific files are included.
- If you add a real solution export later, review it for environment-specific configuration and secrets first.
