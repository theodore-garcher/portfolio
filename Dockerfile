# Build
FROM node:23-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Serve
FROM node:23-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist .
CMD ["serve", "-s", ".", "-l", "3000"]