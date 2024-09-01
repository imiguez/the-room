# Base image for building
FROM node:22 AS base
WORKDIR /app
COPY package.json ./
RUN npm install --force
COPY . .
# Build the Next.js application
RUN npm run build


# Stage for development
FROM base AS dev
ENV NODE_ENV=dev
CMD ["npm", "run", "dev"]

# Stage for production
FROM node:22-slim AS prod
WORKDIR /app
COPY --from=base /app /app
ENV NODE_ENV=prod
RUN npm install --only=production
CMD ["npm", "start"]