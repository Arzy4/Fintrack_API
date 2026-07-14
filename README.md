# FINTRACK API

---

## Project Description

**FinTrack API is a backend application for a personal finance tracking system**. It allows users to manage multiple financial accounts, record income and expense transactions, and organize those transactions using categories. The project is designed to demonstrate database design, SQL fundamentals, and the basic structure of a RESTful API using PostgreSQL and NestJS.

---

## ERD

**The Entity Relationship Diagram (ERD) illustrates the database structure of the FinTrack API.** It shows the four main entities in the system, their attributes, primary keys, and foreign key relationships. The design follows a normalized relational database structure to reduce data redundancy and maintain data integrity.

![ERD](docs/Fintrack_ERD.png)

### Relation Explanation

1. **Users → Accounts**
    - One user can own multiple financial accounts.
    - Each account belongs to exactly one user.

2. **Accounts → Transactions**
    - One account can contain multiple transactions.
    - Each transaction is recorded under one account.

3. **Categories → Transactions**
    - One category can be assigned to many transactions.
    - Each transaction belongs to one category.

---

## How To Run NestJS

NestJS is a backend framework built on top of Node.js and TypeScript that helps developers create structured and scalable server-side applications. In this project, it is used to organize the application into modules, controllers, and services, making the API easier to develop and maintain.

Follow these steps to run the FinTrack API locally:

1. Clone this repository to your local machine.
2. Open the project using Visual Studio Code or your preferred code editor.
3. Install all required project dependencies:

    ```bash
    npm install
    ```

4. (Optional) Create a `.env` file in the project root for future database configuration.
Example:

    ```env
    DATABASE_URL=postgresql://postgres:your_password@localhost:5432/fintrack
    PORT=3000
    ```

5. Start the NestJS development server:

    ```bash
    npm run start:dev
    ```

6. Once the server is running, access the available endpoints through your browser or an API testing tool such as Postman:

    ```
    http://localhost:3000/users
    http://localhost:3000/accounts
    http://localhost:3000/categories
    http://localhost:3000/transactions
    ```

The application will automatically reload whenever source code changes are saved while running in development mode.

---

## How to Run the SQL Files

The SQL files are used to create the database structure, insert sample data, and execute SQL queries for the FinTrack API. PostgreSQL and pgAdmin 4 were used to manage and run the database throughout this project.

Follow these steps to execute the SQL files:

1. Open **pgAdmin 4** and connect to your local PostgreSQL server.
2. Create a new database named `fintrack`.
3. Open the **Query Tool** for the `fintrack` database.
4. Execute the SQL files in the following order:
   **Step 1:** Run `db/schema.sql` to create all required tables and relationships.

   **Step 2:** Run `db/seed.sql` to insert sample data into the tables.

   **Step 3:** Run `db/queries.sql` to execute the sample SQL queries and verify the database results.
5. After executing each file successfully, you can verify the database by:
   - Refreshing the database objects in pgAdmin.
   - Viewing the tables under **Schemas → public → Tables**.
   - Running additional `SELECT` statements if needed to inspect the inserted data.

The SQL files should always be executed in the order above because the database schema must exist before inserting data, and the sample data must be available before running the queries.