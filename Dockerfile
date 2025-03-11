# Stage 1: Build
FROM node:18.15.0-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN yarn install --frozen-lockfile

# Copy application code
COPY . .

# Build the application
RUN yarn build

# Stage 2: Production
FROM node:18.15.0-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy only necessary files from the builder stage
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.env .env

# Install only production dependencies
RUN yarn install --production --frozen-lockfile && yarn cache clean

# Expose the port
EXPOSE 3003

# Specify the command to run your app
CMD ["node", "dist/main.js"]
