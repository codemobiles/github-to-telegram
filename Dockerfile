FROM node:22-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port (default 8080, can be overridden)
ARG PORT=8080
EXPOSE ${PORT}

# Start the app
CMD ["node", "index.js"]
