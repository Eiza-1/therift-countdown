# Deploying TheRift (Countdown Webapp)

This file explains how to create a Git repo and deploy the static site to Vercel or Netlify.

Prerequisites
- Git installed and configured (name/email).
- A GitHub account (recommended) or any Git remote provider.
- Optional: `gh` (GitHub CLI) installed for an automated repo creation flow.

Quick steps (push to GitHub and connect to Vercel/Netlify)

1. Initialize a local git repo (if not already):

```powershell
cd "C:\Users\User\Downloads\TheRift"
git init
git add .
git commit -m "Initial commit: TheRift countdown app"
```

2. Create a remote GitHub repo and push (manual):

```powershell
# Create the remote repo on GitHub via the website, then run:
git remote add origin git@github.com:YOUR_USERNAME/therift-countdown.git
git branch -M main
git push -u origin main
```

Or automate with GitHub CLI (if installed):

```powershell
# This will create a GitHub repo and push the current branch (you must be logged in to gh)
gh repo create YOUR_USERNAME/therift-countdown --public --source . --remote origin --push
```

3. Deploy on Vercel
- Go to https://vercel.com, sign in and click "Import Project" → "Import from Git Repository" → pick your repo.
- Vercel will detect a static project; leave build settings default.
- Add `OMDB_API_KEY` as an Environment Variable in the Vercel dashboard (if you use OMDB).

4. Deploy on Netlify
- Go to https://app.netlify.com, click "New site from Git", connect your Git provider and choose the repo.
- For "Build command" leave blank and for "Publish directory" set `.` (root) since this is a static site.
- Add `OMDB_API_KEY` in Site Settings → Build & deploy → Environment.

Helpful files added
- `netlify.toml` — Netlify configuration + caching headers
- `vercel.json` — Vercel configuration for static project
- `.gitignore` — standard ignores
- `deploy.ps1` — helper script to init repo and optionally create GitHub repo via `gh`

Security note
- Do not commit API keys to the repo. Use each host's environment variable settings.

If you want, I can run `git init` and make the initial commit for you here, and/or run `gh repo create` if you confirm you want the repo created and pushed (you must be logged in to `gh`).
