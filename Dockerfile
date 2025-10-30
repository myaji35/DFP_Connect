# DFP Connect - Production Dockerfile
# GCP Project: marketsphere-476701

FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy application code and pre-built Next.js files
COPY . .

# Expose port
EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
