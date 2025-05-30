# --- Build Stage (for compiling React & Webpack) ---
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy source
COPY ../ .

# Install dependencies
RUN npm install

# Build client-side assets
RUN npm run build

# Start the server
CMD ["npm", "start"]