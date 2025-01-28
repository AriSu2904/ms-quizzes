# Stage 1: Build
FROM node:20 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Copy env
COPY .env .env

# Copy keys for extracting token
COPY dev/public_key.pem dev/public_key.pem
COPY dev/private_key.pem dev/private_key.pem

# Build the NestJS application
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env .env
COPY --from=builder /app/dev/public_key.pem dev/public_key.pem
COPY --from=builder /app/dev/private_key.pem dev/private_key.pem

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["node", "dist/src/main"]