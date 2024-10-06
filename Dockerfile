# Stage 1: Build the TypeScript code
FROM node:18 AS builder

# Install the specific version of npm
RUN npm install -g npm@10.9.0

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Verify build output
RUN ls -l dist

# Stage 2: Run the application
FROM node:18

# Set working directory
WORKDIR /app

# Copy the build output from the builder stage
COPY --from=builder /app/dist ./dist

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the .env file
COPY .env ./

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
