# Use the official Node.js 14 image as base
FROM node:18

# Set working directory in the container
WORKDIR /usr/

# Install MongoDB tools
RUN apt-get update && \
    apt-get install -y mongodb-org-tools

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port where your Next.js app will run
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "dev"]
