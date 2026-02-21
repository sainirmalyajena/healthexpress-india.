# HealthExpress India - Deployment Guide

This guide covers how to deploy your Next.js application to Vercel and connect your purchased domain **healthexpressindia.com**.

## 1. Prerequisites
*   You have the code on your local machine.
*   You have a [GitHub](https://github.com) account.
*   You have a [Vercel](https://vercel.com) account (free).
*   You have access to your GoDaddy account for `healthexpressindia.com`.

## 2. Push Code to GitHub
Since you don't have a repository yet, follow these steps in your terminal (VS Code):

1.  Initialize Git:
    ```bash
    git init
    git add .
    git commit -m "Initial commit for production"
    ```
2.  Go to GitHub.com and create a **New Repository** named `healthexpress-india`.
3.  Copy the commands to "push an existing repository from the command line" and run them. They usually look like:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/healthexpress-india.git
    git branch -M main
    git push -u origin main
    ```

## 3. Deploy to Vercel
1.  Log in to [Vercel](https://vercel.com).
2.  Click **Add New > Project**.
3.  Select the `healthexpress-india` repository you just created.
4.  **Environment Variables**:
    *   Expand the "Environment Variables" section.
    *   Add `DATABASE_URL`: (Paste your Neon database connection string)
    *   Add `JWT_SECRET`: (Enter a random secret key)
5.  Click **Deploy**.
6.  Wait for the confetti! Your site is now live on a generic URL (e.g., `healthexpress-india.vercel.app`).

## 4. Connect Your Domain (healthexpressindia.com)
Now, make it use your `.com` domain.

### Step A: Vercel Settings
1.  In your Vercel Project, go to **Settings > Domains**.
2.  Enter `healthexpressindia.com` in the input box.
3.  Click **Add**.
4.  Select the recommended option (it will guide you to update DNS).

### Step B: GoDaddy DNS Update
1.  Log in to **GoDaddy**.
2.  Navigate to **My Products** > **healthexpressindia.com**.
3.  Click **DNS** or **Manage DNS**.
4.  **Delete** any existing records that say "Parked".
5.  Add the records Vercel shows you. Typically:

    **Record 1 (A Record):**
    *   **Type:** A
    *   **Name:** @
    *   **Value:** `76.76.21.21` (This is Vercel's IP)
    *   **TTL:** 600 seconds (or 1 Hour)
    
    **CRITICAL: DELETE THESE RECORDS IF YOU SEE THEM:**
    *   Any A record pointing to `3.33.130.190`
    *   Any A record pointing to `15.197.148.33`
    *(These are GoDaddy/Parking pages causing the "Invalid Configuration" error)*

    **Record 2 (CNAME Record):**
    *   **Type:** CNAME
    *   **Name:** www
    *   **Value:** `cname.vercel-dns.com`
    *   **TTL:** 1 Hour

### Step C: Verification
1.  Go back to the Vercel Domains page.
2.  It might check automatically. If it says "Invalid Configuration", wait 5-10 minutes and refresh.
3.  Once the icons turn blue/green, Vercel will automatically generate an SSL certificate for you.

**Congratulations! Your site is now live at https://healthexpressindia.com**
