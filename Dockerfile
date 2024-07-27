FROM node:21-slim

# Install dependencies
RUN apt update && apt install -y openssl procps
RUN npm install -g @nestjs/cli
RUN npm install -g @prisma/client

# Create app directory
WORKDIR /home/node/app

# Set the user to the node user
USER node

# Process to run
CMD tail -f /dev/null