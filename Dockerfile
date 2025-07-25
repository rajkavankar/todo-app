FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache libc6-compat python3 make g++

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/prisma /app/prisma
COPY --from=builder /app/dist ./dist

RUN npx prisma generate

USER node
EXPOSE 5000

CMD ["/bin/sh", "-c", "npx prisma migrate deploy && npm run start:prod"]
