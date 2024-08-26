FROM node:22-alpine

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install dependencies
RUN npm install -g @nestjs/cli

# Copy the rest of your project files
COPY . .

EXPOSE 3000/tcp

# Define the command to start your NestJS application
CMD ["sh", "-c", "if [ {$NODE_ENV} = 'dev' ]; then nest start --watch; else node dist/main; fi"]
