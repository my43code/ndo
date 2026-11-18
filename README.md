This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Admin configuration

Set `NEXTAUTH_URL` to the URL used to open the app (for example, `http://localhost:3000` locally or the live HTTPS origin in production). Set `NEXTAUTH_SECRET`, `MONGODB_URI`, and the approved email in `ADMIN_EMAIL` or `ADMIN_EMAILS`. `ADMIN_PASSWORD` supplies the initial password until that account sets a password through the reset flow.

To enable email password recovery, set `SMTP_USER` and `SMTP_PASS` on the application host. The default SMTP endpoint is Gmail on port 465. Set `SMTP_HOST` and `SMTP_PORT` for a different provider, and set `SMTP_FROM` if the provider uses a separate verified sender address.

If SMTP is unavailable, an operator with the site's `MONGODB_URI` and `NEXTAUTH_SECRET` can issue a single-use, 15-minute code from a private terminal:

```shell
node --env-file-if-exists=.env.local scripts/create-admin-reset-code.mjs
```

If multiple admin emails are configured, pass the intended email as the final argument. On the reset page, enter that email and choose **Use a reset code**. Run the command with the same database and signing secret as the running website.
