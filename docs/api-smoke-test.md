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
        "id": 2,
        "user_id": 1,
        "name": "GoPay Wallet",
        "type": "e-wallet",
        "balance": "350000",
        "created_at": "2026-08-03T14:19:18.176Z"
    },
    {
        "id": 3,
        "user_id": 2,
        "name": "Mandiri Savings",
        "type": "bank",
        "balance": "6200000",
        "created_at": "2026-08-03T14:19:18.176Z"
    },
    {
        "id": 4,
        "user_id": 2,
        "name": "Cash Wallet",
        "type": "cash",
        "balance": "500000",
        "created_at": "2026-08-03T14:19:18.176Z"
    },
    {
        "id": 5,
        "user_id": 3,
        "name": "BNI Savings",
        "type": "bank",
        "balance": "7300000",
        "created_at": "2026-08-03T14:19:18.176Z"
    },
    {
        "id": 6,
        "user_id": 3,
        "name": "OVO Wallet",
        "type": "e-wallet",
        "balance": "275000",
        "created_at": "2026-08-03T14:19:18.176Z"
    },
    {
        "id": 7,
        "user_id": 1,
        "name": "Cash Wallet",
        "type": "cash",
        "balance": "500000",
        "created_at": "2026-08-04T13:02:23.348Z"
    },
    {
        "id": 1,
        "user_id": 1,
        "name": "BCA Savings",
        "type": "bank",
        "balance": "8275000",
        "created_at": "2026-08-03T14:19:18.176Z"
    },
    {
        "id": 8,
        "user_id": 7,
        "name": "BCA",
        "type": "bank",
        "balance": "0",
        "created_at": "2026-08-05T14:14:48.279Z"
    }
]
```

---

### GET /accounts/:id

Retrieves a specific account by its ID.

**Request**

```bash
curl -X GET https://nestjs-project-five.vercel.app/api/accounts/1
```

**Response**

```json
{
    "id": 1,
    "user_id": 1,
    "name": "BCA Savings",
    "type": "bank",
    "balance": "8275000",
    "created_at": "2026-08-03T14:19:18.176Z"
}
```

---

### POST /accounts

Creates a new account.

**Request**

```bash
curl -X POST https://nestjs-project-five.vercel.app/api/accounts \
-H "Content-Type: application/json" \
-d '{
  "user_id": 1,
  "name": "BCA Savings",
  "type": "bank",
  "balance": 5000000
}'
```

**Response**

```json
{
    "message": "New Account was successfully created",
    "data": {
        "id": 9,
        "user_id": 1,
        "name": "BCA Savings",
        "type": "bank",
        "balance": "5000000",
        "created_at": "2026-08-07T12:32:10.559Z"
    }
}
```

---

### PATCH /accounts/:id

Updates an existing account.

**Request**

```bash
curl -X PATCH https://nestjs-project-five.vercel.app/api/accounts/1 \
-H "Content-Type: application/json" \
-d '{
  "name": "BCA Savings Updated",
  "type": "bank",
  "balance": 5500000
}'
```

**Response**

```json
{
    "message": "name in Account with id 1 was successfully Updated.",
    "data": {
        "id": 1,
        "user_id": 1,
        "name": "BCA Savings Updated",
        "type": "bank",
        "balance": "5500000",
        "created_at": "2026-08-03T14:19:18.176Z"
    }
}
```

---

### DELETE /accounts/:id

Deletes an account by its ID.

**Request**

```bash
curl -X DELETE https://nestjs-project-five.vercel.app/api/accounts/9
```

**Response**

```json
{
    "message": "Account with ID 9 was successfully deleted.",
    "data": {
        "id": 9,
        "user_id": 1,
        "name": "BCA Savings",
        "type": "bank",
        "balance": "5000000",
        "created_at": "2026-08-07T12:32:10.559Z"
    }
}
```

---

# Users

### GET /users

Retrieves all registered users.

**Request**

```bash
curl -X GET https://nestjs-project-five.vercel.app/api/users
```

**Response**

```json
[
    {
        "id": 1,
        "name": "Robby Arzy",
        "email": "robby@example.com",
        "password": "password123",
        "role": "user",
        "created_at": "2026-08-03T14:19:18.048Z"
    },
    {
        "id": 2,
        "name": "Amanda Wijaya",
        "email": "amanda@example.com",
        "password": "password123",
        "role": "user",
        "created_at": "2026-08-03T14:19:18.048Z"
    },
    {
        "id": 3,
        "name": "Kevin Tan",
        "email": "kevin@example.com",
        "password": "password123",
        "role": "user",
        "created_at": "2026-08-03T14:19:18.048Z"
    },
    {
        "id": 6,
        "name": "John Doe",
        "email": "john@example.com",
        "password": "password123",
        "role": "user",
        "created_at": "2026-08-04T12:55:33.428Z"
    },
    {
        "id": 7,
        "name": "Alice",
        "email": "alice@example.com",
        "password": "$2b$10$ROoyBRpjzDQVETkf7ccGsO7h/mcawhMe7pW.15jAJ79e0PgmDBg9y",
        "role": "user",
        "created_at": "2026-08-05T13:11:01.742Z"
    }
]
```

---

### POST /users

Creates a new user.

**Request**

```bash
curl -X POST https://nestjs-project-five.vercel.app/api/users \
-H "Content-Type: application/json" \
-d '{
  "name": "Tom Perru",
  "email": "tom@example.com",
  "password": "password123"
}'
```

**Response**

```json
{
    "message": "New User was successfully created",
    "data": {
        "id": 8,
        "name": "Tom Perru",
        "email": "tom@example.com",
        "password": "password123",
        "role": "user",
        "created_at": "2026-08-07T12:35:28.986Z"
    }
}
```

---

### PATCH /users/:id

Updates an existing user.

**Request**

```bash
curl -X PATCH https://nestjs-project-five.vercel.app/api/users/8 \
-H "Content-Type: application/json" \
-d '{
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "password": "newpassword123"
}'
```

**Response**

```json
{
    "message": "User with ID 8 was successfully updated",
    "data": {
        "id": 8,
        "name": "John Smith",
        "email": "johnsmith@example.com",
        "password": "newpassword123",
        "role": "user",
        "created_at": "2026-08-07T12:35:28.986Z"
    }
}
```

---

### DELETE /users/:id

Deletes a user by ID.

**Request**

```bash
curl -X DELETE https://nestjs-project-five.vercel.app/api/users/8
```

**Response**

```json
{
    "message": "User with ID 8 was successfully deleted",
    "data": {
        "id": 8,
        "name": "John Smith",
        "email": "johnsmith@example.com",
        "password": "newpassword123",
        "role": "user",
        "created_at": "2026-08-07T12:35:28.986Z"
    }
}
```

---

# Categories

### GET /categories

Retrieves all categories.

**Request**

```bash
curl -X GET https://nestjs-project-five.vercel.app/api/categories
```

**Response**

```json
[
    {
        "id": 1,
        "name": "Salary",
        "type": "income"
    },
    {
        "id": 2,
        "name": "Freelance",
        "type": "income"
    },
    {
        "id": 3,
        "name": "Bonus",
        "type": "income"
    },
    {
        "id": 4,
        "name": "Food",
        "type": "expense"
    },
    {
        "id": 5,
        "name": "Transportation",
        "type": "expense"
    },
    {
        "id": 6,
        "name": "Entertainment",
        "type": "expense"
    },
    {
        "id": 7,
        "name": "Food",
        "type": "expense"
    }
]
```

---

### GET /categories/:id

Retrieves a specific category by its ID.

**Request**

```bash
curl -X GET https://nestjs-project-five.vercel.app/api/categories/1
```

**Response**

```json
{
    "id": 1,
    "name": "Salary",
    "type": "income"
}
```

---

### POST /categories

Creates a new category.

**Request**

```bash
curl -X POST https://nestjs-project-five.vercel.app/api/categories \
-H "Content-Type: application/json" \
-d '{
    "name": "Food",
    "type": "expense"
}'
```

**Response**

```json
{
    "message": "New Category was successfully created.",
    "data": {
        "id": 8,
        "name": "Food",
        "type": "expense"
    }
}
```

---

### PATCH /categories/:id

Updates an existing category.

**Request**

```bash
curl -X PATCH https://nestjs-project-five.vercel.app/api/categories/8 \
-H "Content-Type: application/json" \
-d '{
    "name": "Health"
}'
```

**Response**

```json
{
    "message": "name in Category with ID 8 was successfully updated.",
    "data": {
        "id": 8,
        "name": "Health",
        "type": "expense"
    }
}
```

---

### DELETE /categories/:id

Deletes a category by its ID.

**Request**

```bash
curl -X DELETE https://nestjs-project-five.vercel.app/api/categories/8
```

**Response**

```json
{
    "message": "Category with ID 8 was successfully deleted.",
    "data": {
        "id": 8,
        "name": "Health",
        "type": "expense"
    }
}
```

---

# Transactions

### GET /transactions

Retrieves all transactions.

**Request**

```bash
curl -X GET https://nestjs-project-five.vercel.app/api/transactions
```

**Response**

```json
[
    {
        "id": 1,
        "account_id": 1,
        "category_id": 1,
        "type": "income",
        "amount": "7000000",
        "description": "January salary",
        "transaction_date": "2026-01-25T00:00:00.000Z",
        "created_at": "2026-08-03T14:19:18.415Z",
        "accounts": {
            "name": "BCA Savings",
            "type": "bank",
            "balance": "8275000"
        },
        "categories": {
            "name": "Salary",
            "type": "income"
        }
    },
    {
        "id": 2,
        "account_id": 1,
        "category_id": 4,
        "type": "expense",
        "amount": "125000",
        "description": "Weekly groceries",
        "transaction_date": "2026-01-27T00:00:00.000Z",
        "created_at": "2026-08-03T14:19:18.415Z",
        "accounts": {
            "name": "BCA Savings",
            "type": "bank",
            "balance": "8275000"
        },
        "categories": {
            "name": "Food",
            "type": "expense"
        }
    },
    {
        "id": 3,
        "account_id": 1,
        "category_id": 5,
        "type": "expense",
        "amount": "50000",
        "description": "Fuel purchase",
        "transaction_date": "2026-01-29T00:00:00.000Z",
        "created_at": "2026-08-03T14:19:18.415Z",
        "accounts": {
            "name": "BCA Savings",
            "type": "bank",
            "balance": "8275000"
        },
        "categories": {
            "name": "Transportation",
            "type": "expense"
        }
    },
    {
        "id": 4,
        "account_id": 1,
        "category_id": 2,
        "type": "income",
        "amount": "1500000",
        "description": "Website freelance project",
        "transaction_date": "2026-02-05T00:00:00.000Z",
        "created_at": "2026-08-03T14:19:18.415Z",
        "accounts": {
            "name": "BCA Savings",
            "type": "bank",
            "balance": "8275000"
        },
        "categories": {
            "name": "Freelance",
            "type": "income"
        }
    },
    {
        "id": 5,
        "account_id": 2,
        "category_id": 4,
        "type": "expense",
        "amount": "35000",
        "description": "Lunch order",
        "transaction_date": "2026-02-07T00:00:00.000Z",
        "created_at": "2026-08-03T14:19:18.415Z",
        "accounts": {
            "name": "GoPay Wallet",
            "type": "e-wallet",
            "balance": "350000"
        },
        "categories": {
            "name": "Food",
            "type": "expense"
        }
    },
    {
        "id": 6,
        "account_id": 2,
        "category_id": 5,
        "type": "expense",
        "amount": "22000",
        "description": "Online motorcycle ride",
        "transaction_date": "2026-02-08T00:00:00.000Z",
        "created_at": "2026-08-03T14:19:18.415Z",
        "accounts": {
            "name": "GoPay Wallet",
            "type": "e-wallet",
            "balance": "350000"
        },
        "categories": {
            "name": "Transportation",
            "type": "expense"
        }
    },
    {
        "id": 7,
        "account_id": 2,
        "category_id": 6,
        "type": "expense",
        "amount": "65000",
        "description": "Cinema ticket",
        "transaction_date": "2026-02-10T00:00:00.000Z",
        "created_at": "2026-08-03T14:19:18.415Z",
        "accounts": {
            "name": "GoPay Wallet",
            "type": "e-wallet",
            "balance": "350000"
        },
        "categories": {
            "name": "Entertainment",
            "type": "expense"
        }
    },
    {
        "id": 8,
        "account_id": 2,
        "category_id": 4,
        "type": "expense",
        "amount": "28000",
        "description": "Coffee and snack",
        "transaction_date": "2026-02-12T00:00:00.000Z",
        "created_at": "2026-08-03T14:19:18.415Z",
        "accounts": {
            "name": "GoPay Wallet",
            "type": "e-wallet",
            "balance": "350000"
        },
        "categories": {
            "name": "Food",
            "type": "expense"
        }
    },
    {
        "id": 9,
        "account_id": 3,
        "category_id": 1,
        "type": "income",
        "amount": "6500000",
        "description": "January salary",
        "transaction_date": "2026-01-25T00:00:00.000Z",
        "created_at": "2026-08-03T14:19:18.415Z",
        "accounts": {
            "name": "Mandiri Savings",
            "type": "bank",
            "balance": "6200000"
        },
        "categories": {
            "name": "Salary",
            "type": "income"
        }
    },
    {
        "id": 10,
        "account_id": 3,
        "category_id": 4,
        "type": "expense",
        "amount": "450000",
        "description": "Monthly groceries",
        "transaction_date": "2026-01-28T00:00:00.000Z",
        "created_at": "2026-08-03T14:19:18.415Z",
        "accounts": {
            "name": "Mandiri Savings",
            "type": "bank",
            "balance": "6200000"
        },
        "categories": {
            "name": "Food",
            "type": "expense"
        }
    },
    {
        "id": 11,
        "account_id": 3,
        "category_id": 5,
        "type": "expense",
        "amount": "200000",
        "description": "Transportation expenses",
        "transaction_date": "2026-02-01T00:00:00.000Z",
        "created_at": "2026-08-03T14:19:18.415Z",
        "accounts": {
            "name": "Mandiri Savings",
            "type": "bank",
            "balance": "6200000"
        },
        "categories": {
            "name": "Transportation",
            "type": "expense"
        }
    },
    {
        "id": 12,
        "account_id": 3,
        "category_id": 3,
        "type": "income",
        "amount": "750000",
        "description": "Performance bonus",
        "transaction_date": "2026-02-03T00:00:00.000Z",
        "created_at": "2026-08-03T14:19:18.415Z",
        "accounts": {
            "name": "Mandiri Savings",
            "type": "bank",
            "balance": "6200000"
        },
        "categories": {
            "name": "Bonus",
            "type": "income"
        }
    },
    {
        "id": 13,
        "account_id": 4,
        "category_id": 4,
        "type": "expense",
        "amount": "40000",
        "description": "Lunch at restaurant",
        "transaction_date": "2026-02-06T00:00:00.000Z",
        "created_at": "2026-08-03T14:19:18.415Z",
        "accounts": {
            "name": "Cash Wallet",
            "type": "cash",
            "balance": "500000"
        },
        "categories": {
            "name": "Food",
            "type": "expense"
        }
    },
    {
        "id": 14,
        "account_id": 4,
        "category_id": 5,
        "type": "expense",
        "amount": "30000",
        "description": "Parking fee",
        "transaction_date": "2026-02-07T00:00:00.000Z",
        "created_at": "2026-08-03T14:19:18.415Z",
        "accounts": {
            "name": "Cash Wallet",
            "type": "cash",
            "balance": "500000"
        },
        "categories": {
            "name": "Transportation",
            "type": "expense"
        }
    },
    {
        "id": 15,
        "account_id": 4,
        "category_id": 6,
        "type": "expense",
        "amount": "100000",
        "description": "Concert ticket",
        "transaction_date": "2026-02-11T00:00:00.000Z",
        "created_at": "2026-08-03T14:19:18.415Z",
        "accounts": {
            "name": "Cash Wallet",
            "type": "cash",
            "balance": "500000"
        },
        "categories": {
            "name": "Entertainment",
            "type": "expense"
        }
    },
    {
        "id": 16,
        "account_id": 4,
        "category_id": 4,
        "type": "expense",
        "amount": "55000",
        "description": "Dinner with friends",
        "transaction_date": "2026-02-13T00:00:00.000Z",
        "created_at": "2026-08-03T14:19:18.415Z",
        "accounts": {
            "name": "Cash Wallet",
            "type": "cash",
            "balance": "500000"
        },
        "categories": {
            "name": "Food",
            "type": "expense"
        }
    },
    {
        "id": 17,
        "account_id": 5,
        "category_id": 1,
        "type": "income",
        "amount": "6800000",
        "description": "January salary",
        "transaction_date": "2026-01-25T00:00:00.000Z",
        "created_at": "2026-08-03T14:19:18.415Z",
        "accounts": {
            "name": "BNI Savings",
            "type": "bank",
            "balance": "7300000"
        },
        "categories": {
            "name": "Salary",
            "type": "income"
        }
    },
    {
        "id": 18,
        "account_id": 5,
        "category_id": 2,
        "type": "income",
        "amount": "900000",
        "description": "Logo design project",
        "transaction_date": "2026-02-02T00:00:00.000Z",
        "created_at": "2026-08-03T14:19:18.415Z",
        "accounts": {
            "name": "BNI Savings",
            "type": "bank",
            "balance": "7300000"
        },
        "categories": {
            "name": "Freelance",
            "type": "income"
        }
    },
    {
        "id": 19,
        "account_id": 5,
        "category_id": 4,
        "type": "expense",
        "amount": "375000",
        "description": "Monthly groceries",
        "transaction_date": "2026-02-04T00:00:00.000Z",
        "created_at": "2026-08-03T14:19:18.415Z",
        "accounts": {
            "name": "BNI Savings",
            "type": "bank",
            "balance": "7300000"
        },
        "categories": {
            "name": "Food",
            "type": "expense"
        }
    },
    {
        "id": 20,
        "account_id": 5,
        "category_id": 5,
        "type": "expense",
        "amount": "175000",
        "description": "Monthly transportation",
        "transaction_date": "2026-02-06T00:00:00.000Z",
        "created_at": "2026-08-03T14:19:18.415Z",
        "accounts": {
            "name": "BNI Savings",
            "type": "bank",
            "balance": "7300000"
        },
        "categories": {
            "name": "Transportation",
            "type": "expense"
        }
    },
    {
        "id": 21,
        "account_id": 6,
        "category_id": 4,
        "type": "expense",
        "amount": "32000",
        "description": "Food delivery",
        "transaction_date": "2026-02-08T00:00:00.000Z",
        "created_at": "2026-08-03T14:19:18.415Z",
        "accounts": {
            "name": "OVO Wallet",
            "type": "e-wallet",
            "balance": "275000"
        },
        "categories": {
            "name": "Food",
            "type": "expense"
        }
    },
    {
        "id": 22,
        "account_id": 6,
        "category_id": 5,
        "type": "expense",
        "amount": "25000",
        "description": "Online taxi ride",
        "transaction_date": "2026-02-09T00:00:00.000Z",
        "created_at": "2026-08-03T14:19:18.415Z",
        "accounts": {
            "name": "OVO Wallet",
            "type": "e-wallet",
            "balance": "275000"
        },
        "categories": {
            "name": "Transportation",
            "type": "expense"
        }
    },
    {
        "id": 23,
        "account_id": 6,
        "category_id": 6,
        "type": "expense",
        "amount": "75000",
        "description": "Streaming subscription",
        "transaction_date": "2026-02-12T00:00:00.000Z",
        "created_at": "2026-08-03T14:19:18.415Z",
        "accounts": {
            "name": "OVO Wallet",
            "type": "e-wallet",
            "balance": "275000"
        },
        "categories": {
            "name": "Entertainment",
            "type": "expense"
        }
    },
    {
        "id": 24,
        "account_id": 6,
        "category_id": 4,
        "type": "expense",
        "amount": "45000",
        "description": "Dinner order",
        "transaction_date": "2026-02-14T00:00:00.000Z",
        "created_at": "2026-08-03T14:19:18.415Z",
        "accounts": {
            "name": "OVO Wallet",
            "type": "e-wallet",
            "balance": "275000"
        },
        "categories": {
            "name": "Food",
            "type": "expense"
        }
    },
    {
        "id": 25,
        "account_id": 1,
        "category_id": 2,
        "type": "expense",
        "amount": "50000",
        "description": "Lunch at a restaurant",
        "transaction_date": "2026-08-04T00:00:00.000Z",
        "created_at": "2026-08-04T13:04:28.427Z",
        "accounts": {
            "name": "BCA Savings",
            "type": "bank",
            "balance": "8275000"
        },
        "categories": {
            "name": "Freelance",
            "type": "income"
        }
    }
]
```

---

### GET /transactions/:id

Retrieves a specific transaction by its ID.

**Request**

```bash
curl -X GET https://nestjs-project-five.vercel.app/api/transactions/1
```

**Response**

```json
{
    "id": 1,
    "account_id": 1,
    "category_id": 1,
    "type": "income",
    "amount": "7000000",
    "description": "January salary",
    "transaction_date": "2026-01-25T00:00:00.000Z",
    "created_at": "2026-08-03T14:19:18.415Z",
    "accounts": {
        "name": "BCA Savings",
        "type": "bank",
        "balance": "8275000"
    },
    "categories": {
        "name": "Salary",
        "type": "income"
    }
}
```

---

### POST /transactions

Creates a new transaction.

**Request**

```bash
curl -X POST https://nestjs-project-five.vercel.app/api/transactions \
-H "Content-Type: application/json" \
-d '{
  "account_id": 1,
  "category_id": 2,
  "type": "expense",
  "amount": 50000,
  "description": "Lunch",
  "transaction_date": "2026-08-07"
}'
```

**Response**

```json
{
    "message": "New Transaction was successfully created",
    "data": {
        "id": 26,
        "account_id": 1,
        "category_id": 2,
        "type": "expense",
        "amount": "50000",
        "description": "Lunch",
        "transaction_date": "2026-08-07T00:00:00.000Z",
        "created_at": "2026-08-07T12:44:27.365Z"
    }
}
```

---

### PATCH /transactions/:id

Updates an existing transaction.

**Request**

```bash
curl -X PATCH https://nestjs-project-five.vercel.app/api/transactions/1 \
-H "Content-Type: application/json" \
-d '{
  "amount": 100000,
  "description": "Tire Fix"
}'
```

**Response**

```json
{
    "message": "amount, description in Transaction with ID 26 was successfully updated",
    "data": {
        "id": 26,
        "account_id": 1,
        "category_id": 2,
        "type": "expense",
        "amount": "100000",
        "description": "Tire Fix",
        "transaction_date": "2026-08-07T00:00:00.000Z",
        "created_at": "2026-08-07T12:44:27.365Z"
    }
}
```

---

### DELETE /transactions/:id

Deletes a transaction by its ID.

**Request**

```bash
curl -X DELETE https://nestjs-project-five.vercel.app/api/transactions/1
```

**Response**

```json
{
    "message": "Transaction with ID 26 was successfully deleted",
    "data": {
        "id": 26,
        "account_id": 1,
        "category_id": 2,
        "type": "expense",
        "amount": "100000",
        "description": "Tire Fix",
        "transaction_date": "2026-08-07T00:00:00.000Z",
        "created_at": "2026-08-07T12:44:27.365Z"
    }
}
```