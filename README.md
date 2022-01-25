# Getting Started

## Prerequisite

1. Node.js
2. PostgreSQL

## Installation

```bash
# Go inside the directory
cd pb-dietela

# Install dependencies for client
npm install

# Install dependencies for server
cd server && npm install
```

## Config API
1. In api folder, rename ".env.example" to ".env"
2. Edit username, password, and databaseName inside .env file 
```bash
DB_USERNAME="username"
DB_PASSWORD="password"
DB_DATABASE="databaseName"
DB_HOST="127.0.0.1"
```
3. Open terimnal, run:
```bash
npx sequelize-cli db:create

npx sequelize-cli db:migrate

npx sequelize-cli db:seed:all
```
4. Start API
```bash
npm run dev
```
## Start Client
In root folder, run:
```bash
npm start
```