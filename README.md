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

## Database / Prisma

1) Set your database connection string:

Create a `.env` file with:

```bash
DATABASE_PROVIDER=postgresql
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public"
```

2) Install and generate the Prisma client:

```bash
npm install
npm run prisma:generate
```

3) Create the database schema (development):

```bash
npm run prisma:migrate -- --name init
# or non-destructive push
npm run db:push
```

4) Open Prisma Studio:

```bash
npm run db:studio
```

## Authentication (NextAuth.js)

Environment variables (in `.env`):

```bash
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-32-char-secret"

# Database (used by Prisma + NextAuth)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME?schema=public"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:5432/DBNAME?schema=public"

# OAuth providers (optional)
GITHUB_ID=
GITHUB_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Routes:

- Sign-in page (optional custom): `/signin`
- NextAuth route: `/api/auth/[...nextauth]`

Dev steps:

```bash
npm install
npm run prisma:migrate -- --name add-auth
npm run dev
```
