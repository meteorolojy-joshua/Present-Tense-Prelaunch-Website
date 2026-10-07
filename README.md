# Present Tense — GitHub Pages edition

This is the latest prelaunch website adapted for static hosting. Its design, copy,
plant artwork, and interactive leaf demonstration are preserved. No server,
database, Node.js, or build step is needed to publish the supplied `docs` folder.

## Upload and publish

1. Extract this ZIP.
2. Upload the entire `docs` folder to the root of your
   `Present-Tense-Prelaunch-Website` GitHub repository. The result must include
   `docs/index.html`, `docs/assets/app.js`, `docs/images/`, and `docs/config.js`.
   Keep the existing source files if you want; they do not interfere when `/docs`
   is the publishing folder. Upload the contents, not the ZIP itself.
3. Open repository **Settings → Pages**.
4. Set **Source** to **Deploy from a branch**.
5. Choose the branch containing the files (normally **main**) and **/docs**.
6. Click **Save**. Wait for the Pages deployment in **Actions** to finish, then
   refresh https://meteorolojy-joshua.github.io/Present-Tense-Prelaunch-Website/.

Relative links and assets work under the repository path and on a custom domain.
Do not upload `node_modules`, `.build`, or any credentials.

## Connect the waitlist later

Until a signup service is configured, the website says “Waitlist opening soon”
and does not accept email addresses. It does not simulate a successful signup.

Create a hosted signup form that includes email, optional interest in paid user
testing, clear consent/privacy information, and an unsubscribe/removal route.
Paste its public HTTPS URL into `docs/config.js` as `waitlistUrl`. The website
then shows a “Join the waitlist” button linking to that form in a new tab.
No rebuild is needed for this configuration change.

Also update `docs/privacy.html` when connecting the form: replace the “not
connected yet” text and identify the service, data use, and removal procedure.
Do not put private API keys in `config.js` or any public file.

## Edit and rebuild

The included `src` folder contains the editable React components and stylesheet;
`public` contains assets, the privacy page, and signup configuration.

Install Node.js, then run in this folder:

```sh
npm install
npm run build
```

The build prerenders the page into HTML and bundles its interactions. Upload the
updated `docs` folder afterwards. Before rebuilding, mirror any changes made
directly in `docs/config.js` or `docs/privacy.html` into their `public` versions,
because the build copies `public` into `docs`.

The leaf demo stores edits only in page memory. Reloading clears them. The
waitlist database and API routes from the original Sites version are not used.
