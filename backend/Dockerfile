# Base image for building
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g @nestjs/cli
COPY . .
# Build the Nest.js application
RUN npm run build


# Stage for development
FROM base AS dev
ENV NODE_ENV=dev
CMD ["npm", "run", "start:dev"]

# Stage for production
FROM node:22-slim AS prod
WORKDIR /app
COPY --from=base /app /app
ENV NODE_ENV=prod
RUN npm install --only=production
CMD ["npm", "run", "start:prod"]