# FinTrack API Smoke Test

This document contains representative API requests and responses for each main resource in the FinTrack REST API.

## Deployment

**Base URL**

```text
https://nestjs-project-five.vercel.app/api
```

---

# Accounts

### GET /accounts

Retrieves all available accounts.

**Request**

```bash
curl -X GET https://nestjs-project-five.vercel.app/api/accounts
```

**Response**

```json
[
    {
        "id": 1,
        "user_id": 1,
        "name": "BCA Savings",
        "type": "bank",
        "balance": 5000000,
        "created_at": "2026-07-13T21:52:46.719Z"
    },
    {
        "id": 2,
        "user_id": 1,
        "name": "GoPay",
        "type": "e-wallet",
        "balance": 750000,
        "created_at": "2026-07-13T21:52:46.719Z"
    },
    {
        "id": 3,
        "user_id": 2,
        "name": "Mandiri Savings",
        "type": "bank",
        "balance": 3200000,
        "created_at": "2026-07-13T21:52:46.719Z"
    }
]
```

---

# Users

### POST /users

Creates a new user.

**Request**

```bash
curl -X POST https://nestjs-project-five.vercel.app/api/users \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}'
```

**Response**

```json
{
    "message": "New User was successfully created",
    "data": {
        "id": 3,
        "name": "John Doe",
        "email": "john@example.com",
        "password": "password123",
        "created_at": "2026-07-31T13:34:53.330Z"
    }
}
```

---

# Categories

### PATCH /categories/2

Updates an existing category.

**Request**

```bash
curl -X PATCH https://nestjs-project-five.vercel.app/api/categories/2 \
-H "Content-Type: application/json" \
-d '{
  "name": "Groceries"
}'
```

**Response**

```json
{
    "message": "name in Category with ID 2 was successfully updated.",
    "data": {
        "id": 2,
        "name": "Groceries",
        "type": "expense"
    }
}
```

---

# Transactions

### DELETE /transactions/3

Deletes a transaction.

**Request**

```bash
curl -X DELETE https://nestjs-project-five.vercel.app/api/transactions/3
```

**Response**

```json
{
    "message": "Transaction with ID 3 was successfully deleted",
    "data": {
        "id": 3,
        "account_id": 2,
        "category_id": 2,
        "type": "expense",
        "amount": 25000,
        "description": "Bus Ticket",
        "transaction_date": "2026-07-03",
        "created_at": "2026-07-13T21:52:46.719Z"
    }
}
```

---

## Notes

The API implements complete CRUD operations for all resources:

### Accounts

- GET /accounts
- GET /accounts/:id
- POST /accounts
- PATCH /accounts/:id
- DELETE /accounts/:id

### Users

- GET /users
- GET /users/:id
- POST /users
- PATCH /users/:id
- DELETE /users/:id

### Categories

- GET /categories
- GET /categories/:id
- POST /categories
- PATCH /categories/:id
- DELETE /categories/:id

### Transactions

- GET /transactions
- GET /transactions/:id
- POST /transactions
- PATCH /transactions/:id
- DELETE /transactions/:id

All endpoints return JSON responses and are accessible through the deployed Vercel application.