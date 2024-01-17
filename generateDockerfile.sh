#!/bin/bash

# Check if an argument is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <environment_variable_value>"
    exit 1
fi

# Set the environment variable value from the command line argument
ENV_VARIABLE="$1"

# Create the Dockerfile
cat > Dockerfile <<EOF
# pull official base image
FROM node:16.19.1-alpine

# set working directory
WORKDIR /app

# Copies package.json and package-lock.json to Docker environment
COPY package*.json ./

# Installs all node packages
RUN npm install

# Copies everything over to Docker environment
COPY . .

# Set environment variable for frontend build
ENV VITE_API_URL=${ENV_VARIABLE}

# Build for production.
RUN npm run build

# Install serve to run the application.
RUN npm install -g serve

# Uses port which is used by the actual application
EXPOSE 3000

# Run application
CMD ["serve", "-s", "dist", "-l", "3000"]
EOF

echo "Dockerfile generated successfully with environment variable VITE_API_URL=${ENV_VARIABLE}"
