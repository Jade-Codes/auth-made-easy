#!/bin/bash

# Navigate to the frontend directory and install dependencies
cd /workspaces/auth-made-easy/client
npm install

# Navigate to the backend directory and install dependencies
cd /workspaces/auth-made-easy/api
pip install -r requirements.txt