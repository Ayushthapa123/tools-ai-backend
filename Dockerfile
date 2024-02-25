
# Use Node.js image
FROM node:18.15.0

# Create app directory
# WORKDIR /app
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of your application code
COPY . .

# Copy the .env file to the image
COPY .env.example .env

# Build your Next.js application
RUN yarn build

# Expose the port
EXPOSE 3001

# Specify the command to run your app
CMD [ "npm", "start" ]
