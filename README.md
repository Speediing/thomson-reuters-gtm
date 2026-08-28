# Thomson Reuters x SpaceXAI

This private Next.js site shows how Grok Bot can support the Thomson Reuters account team.

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Set `SITE_PASSWORD` in `.env.local`.
4. Start the site with `npm run dev`.

Open `http://localhost:3000` and enter the configured password.

## Verify the site

Run these checks before delivery:

```bash
npm run verify
npm run typecheck
npm run build
```

`npm run verify` checks the customer title, official wordmark source, account owner, password configuration, copy, and source residue.
