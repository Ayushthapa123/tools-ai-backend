
# # Use Node.js image
# FROM node:18.15.0

# # Create app directory
# # WORKDIR /app
# WORKDIR /usr/src/app

# # Install app dependencies
# COPY package*.json ./

# # Install dependencies
# RUN yarn install

# # Copy the rest of your application code
# COPY . .

# # Copy the .env file to the image
# COPY .env.example .env

# # Build your Next.js application
# RUN yarn build

# # Expose the port
# EXPOSE 3001

# # Specify the command to run your app
# CMD [ "npm", "start" ]

# Stage 1 - Build
FROM node:18 as build
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

# Stage 2 - Production
FROM node:18-slim
RUN apt update && apt install libssl-dev dumb-init -y --no-install-recommends
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/.env .env
COPY --chown=node:node --from=build /usr/src/app/package.json .
COPY --chown=node:node --from=build /usr/src/app/package-lock.json .
RUN npm install --omit=dev --legacy-peer-deps
COPY --chown=node:node --from=build /usr/src/app/node_modules/.prisma/client ./node_modules/.prisma/client

ENV NODE_ENV production
EXPOSE 3001
CMD ["dumb-init", "node", "dist/src/main.js"]
