# Use the official Node.js image as the base
FROM node:22-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json into the container
COPY package*.json ./

# Install dependencies (Use npm ci for consistent installs)
RUN npm ci

# Copy the application code into the container
COPY . .

# Expose port 5173 (tell Docker this container listens on 5173)
EXPOSE 5173

# Run the application
# Important: Add --host so Vite accepts connections from outside the container
CMD ["npm", "run", "dev", "--", "--host"]