# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Install Git
RUN apt-get update && \
    apt-get install -y git

# Install Node.js
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

# Install FastAPI and Uvicorn
RUN pip install fastapi uvicorn

# Install Vite globally
RUN npm install -g vite

# Set the working directory
WORKDIR /workspace

# Expose the ports for FastAPI and Vite
EXPOSE 8000 5173