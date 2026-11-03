# Portfolio - Instagram & Email Contact Update

This release keeps only the WOTD Award and Tech Stack, and updates the Contact Me section.

## Changes

- Replaces the Contact and About WhatsApp links with Instagram `@vidz_gading` (and an email tile where Instagram already exists).
- Keeps the genuine Instagram camera icon in the Contact Me panel.
- Removes the broken FormSubmit redirect entirely.
- Validates name, sender email, and a message of at least 5 characters.
- Pre-fills a Gmail compose draft with recipient, subject and message on clicking **Continue in Gmail**.
- Provides **Open Gmail** and **Use email app** fallback links if a popup is blocked or Gmail is unavailable.
- Does not show a false 'sent' success notice. The sender must click **Send** in their email account.
- Uses cache-busting versioned assets to reduce stale GitHub Pages display.

## Important

This is a static GitHub Pages website. It cannot send email automatically without a backend or authenticated form delivery service. This release works without accounts, third-party form services, or private credentials, but **does require the visitor to send the prepared message from their own email client**. Gmail's URL-compose behavior can change; the native `mailto:` alternative is available.

## Updating the existing repository

1. In VS Code, go to the existing portfolio repository folder and ensure `git status` has no unfinished merge.
2. Extract `Portofolio-ing-Contact-IG-update-only.zip` into the repository root, replacing `index.html`, `sc.js`, and `portfolio-fixes.css`.
3. Run:

```powershell
git add index.html sc.js portfolio-fixes.css
git commit -m "Update contact form and Instagram links"
git push origin main
```

4. After GitHub Pages finishes deployment, reload with Ctrl+Shift+R.

## Check

- Enter name, email, message; click **Continue in Gmail**. Check Gmail's draft: recipient `hafizgading54685@gmail.com`, subject, message. **Press Send yourself**.
- If Gmail does not open, click **Use email app**.
- Click Instagram in Contact Me: it should open `https://www.instagram.com/vidz_gading/`.
