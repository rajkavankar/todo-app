FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache libc6-compat python3 make g++

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

FROM builder as runner

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY --chown=node:node package*.json ./
RUN npm ci --omit=dev

COPY --chown=node:node --from=builder /app/prisma /app/prisma
COPY --chown=node:node --from=builder /app/dist ./dist

RUN npx prisma generate

USER node
EXPOSE 5000

CMD ["node", "dist/main.js"]
