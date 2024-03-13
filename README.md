# Development

Steps to launch the app in development:

1. Build DB:

```
docker compose up -d
```

2. Rename the .env.template to .env
3. Replace environment variables
4. Execute commands:

```
npm i
npm run dev
```

5. Run these prism commands:

```
npx prisma migrate dev
npx prisma generate
```

6. Run SEED for [create DB local](localhost:3000/api/seed)

# Prisma Commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

# Produc

# Stage
