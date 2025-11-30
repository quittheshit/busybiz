# Netlify Environment Variables Setup

## 🚨 Issue Found

Your environment variables (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`) are not being loaded in your production build on `busybiz.dk`.

**Error in console:**
```
VITE_SUPABASE_URL: undefined
POST https://busybiz.dk/undefined/functions/v1/send-contact-email 404 (Not Found)
```

## ✅ Solution: Add Environment Variables to Netlify

### Step 1: Go to Netlify Dashboard

1. Open: https://app.netlify.com
2. Log in to your account
3. Find your **busybiz** site
4. Click on it

### Step 2: Add Environment Variables

1. Click **"Site configuration"** in the left sidebar
2. Click **"Environment variables"**
3. Click **"Add a variable"** → **"Add a single variable"**

### Step 3: Add These Two Variables

**Variable 1:**
- **Key**: `VITE_SUPABASE_URL`
- **Value**: `https://kpenyapvswavbyxrboud.supabase.co`
- **Scopes**: Select "All scopes" or at least "Builds" and "Functions"
- Click **"Create variable"**

**Variable 2:**
- **Key**: `VITE_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwZW55YXB2c3dhdmJ5eHJib3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4OTc0NzYsImV4cCI6MjA3OTQ3MzQ3Nn0.VgSDYHlTwVXQDZDRSHFJBXoyHczQmMXJvS8j9dfsvgE`
- **Scopes**: Select "All scopes" or at least "Builds" and "Functions"
- Click **"Create variable"**

### Step 4: Redeploy Your Site

After adding the environment variables:

1. Go to **"Deploys"** tab in Netlify
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait for the build to complete (usually 1-2 minutes)

**OR** just push a new commit to your Git repository and Netlify will automatically rebuild.

### Step 5: Verify It Works

1. Visit your site: https://busybiz.dk
2. Open browser console (F12)
3. Click phone icon to open contact form
4. Fill out and submit the form
5. Check console - you should now see:
   ```
   VITE_SUPABASE_URL: https://kpenyapvswavbyxrboud.supabase.co
   Response status: 200
   Response data: {success: true, ...}
   ```

---

## 🎯 Quick Reference

### Environment Variables You Need in Netlify:

| Variable Name | Value | Purpose |
|--------------|-------|---------|
| `VITE_SUPABASE_URL` | `https://kpenyapvswavbyxrboud.supabase.co` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGc...` (long token) | Supabase anonymous key for frontend |

### Where to Find These Values:

These are already in your `.env` file in the project. You just need to copy them to Netlify's dashboard.

---

## 📝 Alternative: Using Netlify CLI

If you prefer using the command line:

```bash
# Install Netlify CLI (if not installed)
npm install -g netlify-cli

# Login to Netlify
netlify login

# Link your site
netlify link

# Set environment variables
netlify env:set VITE_SUPABASE_URL "https://kpenyapvswavbyxrboud.supabase.co"
netlify env:set VITE_SUPABASE_ANON_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwZW55YXB2c3dhdmJ5eHJib3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4OTc0NzYsImV4cCI6MjA3OTQ3MzQ3Nn0.VgSDYHlTwVXQDZDRSHFJBXoyHczQmMXJvS8j9dfsvgE"

# Trigger a new deploy
netlify deploy --prod
```

---

## 🔍 Why This Happened

When you build a Vite app for production:
1. Vite looks for environment variables that start with `VITE_`
2. It embeds them into the JavaScript bundle at build time
3. **On Netlify**, the `.env` file in your repository is NOT used during builds
4. You must set environment variables in Netlify's dashboard

This is a security feature - it prevents accidentally committing secrets to Git.

---

## ✅ After Setup

Once you add the environment variables and redeploy:
- ✅ Contact form will work on busybiz.dk
- ✅ Emails will be sent successfully
- ✅ No more "undefined" errors

---

## 🆘 Need Help?

If you have trouble finding where to add environment variables in Netlify:
1. The exact path is: **Site settings → Environment variables → Add variable**
2. Or search for "environment" in the Netlify dashboard search bar

**Note**: After adding variables, you MUST redeploy for them to take effect!
