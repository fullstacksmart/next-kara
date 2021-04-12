Prisma steps

- npm i prisma
- npx prisma init
- add {
  "sourceMap": true,
  "outDir": "dist"
  } to tsconfig
- add models to schema.prisma
- run npx prisma migrate dev --name init
