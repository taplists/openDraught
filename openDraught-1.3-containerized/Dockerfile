# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install build tools for bcrypt and other native modules
RUN apt-get update && apt-get install -y build-essential python3

# Install the project dependencies, forcing bcrypt to be built from source
RUN npm install --build-from-source bcrypt

# Copy the rest of the application code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD [ "npm", "start" ]
