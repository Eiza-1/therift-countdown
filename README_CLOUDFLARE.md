# Deploy TheRift to Cloudflare Pages

This guide walks you through deploying the TheRift countdown app to **Cloudflare Pages**.

## Prerequisites

- A GitHub account with this repo already pushed
- A Cloudflare account (free tier works)
- (Optional) Wrangler CLI installed locally (`npm install -g wrangler`)

## Quick Deploy Steps

### 1. Push to GitHub (if not already done)

```powershell
# From project root
git remote add origin https://github.com/YOUR_USERNAME/therift-countdown.git
git branch -M main
git push -u origin main
```

Or use GitHub CLI:

```powershell
gh repo create YOUR_USERNAME/therift-countdown --public --source . --remote origin --push
```

### 2. Connect GitHub to Cloudflare Pages

1. Go to **https://dash.cloudflare.com** and sign in.
2. In the left sidebar, select **Pages** under **Workers & Pages**.
3. Click **Create a project** → **Connect to Git**.
4. Authorize GitHub and select the `therift-countdown` repository.
5. Select the **main** branch.
6. Configure build settings:
   - **Build command**: (leave blank — this is a static site)
   - **Build output directory**: `.` (root directory)
7. Click **Save and Deploy**.

### 3. Set Environment Variables (optional)

If you plan to use the OMDB API:

1. In the Cloudflare Pages dashboard for your project, go to **Settings** → **Environment variables**.
2. Add a variable named `OMDB_API_KEY` with your OMDB API key value.
3. Redeploy by pushing a new commit to main branch, or manually trigger a redeploy.

### 4. View Your Site

Once deployed, Cloudflare will assign you a free domain:
- `https://therift-countdown-XXXXXXXX.pages.dev`

You can optionally connect a custom domain in **Custom domains** settings.

## Local Testing with Wrangler

To test locally before pushing:

```powershell
npm install -g wrangler
wrangler pages dev .
```

Then visit http://localhost:8788 in your browser.

## Files Added

- `wrangler.toml` — Cloudflare Pages config (optional, for local dev with Wrangler)
- `_redirects` — Routing config for Cloudflare Pages (ensures index.html is served for all routes)

## Security Notes

- Never commit `.env` or API keys to the repository.
- Use Cloudflare's **Environment Variables** in the dashboard to inject secrets at deploy time.

## Need Help?

- Cloudflare Pages docs: https://developers.cloudflare.com/pages/
- Wrangler CLI: https://github.com/cloudflare/workers-sdk

---

After deployment, your app will be live and auto-update on every push to the `main` branch.
