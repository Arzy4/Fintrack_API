# FINTRACK API

---

## Project Description

**FinTrack API** is a RESTful backend application for a personal finance tracking system built with **NestJS**, **PostgreSQL**, and **Prisma ORM**. It allows users to manage multiple financial accounts, organize income and expense categories, and record financial transactions.

The project demonstrates:

- Database design using PostgreSQL
- RESTful API development with NestJS
- Prisma ORM integration
- CRUD operations
- DTO validation using `class-validator`
- API documentation with Swagger
- API testing using Postman
- Deployment using Vercel

---

## Live API

The application has been deployed to **Vercel** and connected to a PostgreSQL database using Prisma ORM.

### Base URL

```
https://nestjs-project-five.vercel.app/api
```

### Available Endpoints

#### Health

```
GET     /health
```

#### Users

```
GET     /users
POST    /users
PATCH   /users/:id
DELETE  /users/:id
```

#### Accounts

```
GET     /accounts
GET     /accounts/:id
POST    /accounts
PATCH   /accounts/:id
DELETE  /accounts/:id
```

#### Categories

```
GET     /categories
GET     /categories/:id
POST    /categories
PATCH   /categories/:id
DELETE  /categories/:id
```

#### Transactions

```
GET     /transactions
GET     /transactions/:id
POST    /transactions
PATCH   /transactions/:id
DELETE  /transactions/:id
```

---

## Tech Stack

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- Swagger (OpenAPI)
- Postman
- Vercel

---

## Features

- User Management (CRUD)
- Account Management (CRUD)
- Category Management (CRUD)
- Transaction Management (CRUD)
- Relational queries using Prisma `include`
- Request validation with `class-validator`
- Swagger API documentation
- Postman Collection for API testing
- PostgreSQL relational database
- Prisma ORM integration
- RESTful API architecture
- Cloud deployment using Vercel

---

## ERD

The Entity Relationship Diagram (ERD) illustrates the database structure of the FinTrack API.

![ERD](docs/Fintrack_ERD.png)

### Database Relationships

#### Users → Accounts

- One user can own multiple financial accounts.
- Each account belongs to exactly one user.

#### Accounts → Transactions

- One account can contain multiple transactions.
- Each transaction belongs to exactly one account.

#### Categories → Transactions

- One category can be assigned to many transactions.
- Each transaction belongs to exactly one category.

---

## Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
PORT=3000
```

### Environment Variable Description

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string used by Prisma ORM (e.g., Neon PostgreSQL). |
| `PORT` | Port used to run the NestJS application locally. Default: `3000`. |

### Local Development

Replace the placeholder values in `DATABASE_URL` with your own PostgreSQL or Neon connection string.

Example:

```env
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
```

### Deployment

For deployment (e.g., **Vercel**), configure the same `DATABASE_URL` as an Environment Variable in your hosting platform.

This allows the deployed application to connect securely to the production PostgreSQL database without exposing credentials in the source code.

---

## Running the Project Locally

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Navigate into the project

```bash
cd fintrack-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
PORT=3000
```

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Run database migrations

For development:

```bash
npx prisma migrate dev
```

For production:

```bash
npx prisma migrate deploy
```

### 7. Seed the database

```bash
npm run seed
```

or

```bash
npx prisma db seed
```

### 8. Start the application

```bash
npm run start:dev
```

The API will be available at:

```
http://localhost:3000/api
```

Swagger documentation:

```
http://localhost:3000/docs
```

---

## Database Setup (Prisma)

This project uses **Prisma ORM** as the database access layer.

### Generate Prisma Client

```bash
npx prisma generate
```

### Create a Migration

```bash
npx prisma migrate dev
```

### Deploy Existing Migrations

```bash
npx prisma migrate deploy
```

### Seed the Database

```bash
npx prisma db seed
```

### Open Prisma Studio

```bash
npx prisma studio
```

---

## API Documentation

Swagger UI is available at:

```
http://localhost:3000/docs
```

Swagger provides:

- Interactive API testing
- Request body schemas
- Endpoint descriptions
- Path and query parameters
- Response documentation

---

## Postman Collection

The exported Postman files are located in the `docs` folder.

```
docs/
├── fintrack.postman_collection.json
└── fintrack.postman_environment.json
```

The collection includes:

- Complete CRUD endpoints
- Example request bodies for POST and PATCH
- Success response examples
- Validation error (400) response examples

---

## SQL Files

The SQL scripts from the first capstone are included for reference and learning purposes.

```
db/
├── schema.sql
├── seed.sql
└── queries.sql
```

Execution order:

1. `schema.sql`
2. `seed.sql`
3. `queries.sql`

These scripts demonstrate the original database schema, sample data insertion, and SQL query examples before the project was migrated to Prisma ORM.

---

## Project Structure

```
.
├── docs/
│   ├── Fintrack_ERD.png
│   ├── fintrack.postman_collection.json
│   ├── fintrack.postman_environment.json
│   └── api-smoke-test.md
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
│
├── src/
│   ├── users/
│   ├── accounts/
│   ├── categories/
│   ├── transactions/
│   ├── prisma/
│   └── main.ts
│
└── README.md
```