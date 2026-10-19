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

#### Auth

```
POST    /auth/register
POST    /auth/login
```

#### Users

```
GET     /users
GET     /users/:id
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
- Balance calculation extracted into a dedicated `BalanceCalculatorService` using NestJS Dependency Injection
- Relational queries using Prisma `include`
- Request validation with `class-validator`
- Swagger API documentation
- Postman Collection for API testing
- PostgreSQL relational database
- Prisma ORM integration
- RESTful API architecture
- Cloud deployment using Vercel

---

## Architecture

FinTrack API follows a modular RESTful architecture built with NestJS. The application is organized into feature-based modules, with each module responsible for a specific part of the financial management system.

### Module Structure
- **Auth Module** – Handles user registration, login, password hashing, JWT generation, and authentication.
- **Users Module** – Handles user management and user-related CRUD operations.
- **Accounts Module** – Manages financial accounts owned by users.
- **Categories Module** – Manages income and expense categories.
- **Transactions Module** – Manages financial transactions and updates account balances.
- **Prisma Module** – Provides the Prisma database client through dependency injection.
- **BalanceCalculatorService** – Handles balance calculation logic separately from transaction management.

NestJS controllers handle HTTP requests and delegate business logic to services. Services interact with PostgreSQL through Prisma ORM. The general request flow is:

`Client → Controller → Guard/Middleware → Service → Prisma → PostgreSQL`

This modular structure keeps responsibilities separated and makes the application easier to maintain and test.

### Dependency Injection

The application uses a dedicated `BalanceCalculatorService` as a custom provider to separate balance calculation logic from `TransactionsService`. This keeps transaction management focused on database operations while **centralizing financial calculation logic into a reusable component**. The separation also **improves testability** because the balance calculation can be tested independently without requiring database access.

### Authorization and Authentication Flow

FinTrack API uses JWT-based authentication and role-based authorization.

#### Authentication Flow

1. A user registers through `POST /auth/register`.
2. The user's password is hashed using `bcrypt` before being stored in the database.
3. The user logs in through `POST /auth/login`.
4. After successful authentication, the API generates a JWT containing the authenticated user's identity and role.
5. The client sends the JWT using the `Authorization: Bearer <token>` header.
6. `JwtAuthGuard` validates the JWT before allowing access to protected endpoints.
7. The authenticated user's ID is available through `req.user.id`.
8. Ownership checks ensure users can only access their own accounts and transactions.

#### Role-Based Access Control

FinTrack API supports two roles:

- `user`
- `admin`

Admin-only endpoints are protected using role-based authorization. A normal user attempting to access an admin-only endpoint receives a `403 Forbidden` response. The authorization flow can be summarized as:

`Client → JWT → JwtAuthGuard → User Identity → Role/Ownership Check → Controller → Service`

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

Create a `.env` file in the project root based on `.env.example`.

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/fintrack
PORT=3000
JWT_SECRET="your-jwt-secret"
```

### Environment Variable Description

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string used by Prisma ORM (e.g., Neon PostgreSQL). |
| `PORT` | Port used to run the NestJS application locally. Default: `3000`. |
| JWT_SECRET | Secret key used to sign and verify JWT authentication tokens. |

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

Swagger documentation:

```
https://nestjs-project-five.vercel.app/api/docs
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

- Health check endpoint
- User registration and login
- Complete JWT authentication flow
- Automatic saving of the login token into the `token` environment variable
- Authorized requests using `Bearer {{token}}`
- Complete CRUD endpoints for users, accounts, categories, and transactions
- Example request bodies for POST and PATCH requests
- Successful response examples
- Validation error (`400`) response examples
- Role-based authorization examples
- A `403 Forbidden` example showing a non-admin user being blocked from an admin-only endpoint

### Authentication Flow in Postman

After a successful login, the returned JWT is automatically saved into the `token` environment variable. Protected requests use:

```text
Authorization: Bearer {{token}}
```

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