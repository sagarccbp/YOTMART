# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install --force

# Copy the rest of your application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Expose the port your application will run on
EXPOSE 3002

# Define the command to start your application
CMD ["npm", "run", "build:start"]