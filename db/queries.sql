-- 1. Show all expense transactions for account 1, ordered by newest date first.
SELECT *
FROM transactions
WHERE account_id = 1
  AND type = 'expense'
ORDER BY transaction_date DESC;


-- 2. Show transaction details with the user name, account name, and category name.
SELECT
    t.id,
    u.name AS user_name,
    a.name AS account_name,
    c.name AS category_name,
    t.type,
    t.amount,
    t.description,
    t.transaction_date
FROM transactions t
JOIN accounts a
    ON t.account_id = a.id
JOIN users u
    ON a.user_id = u.id
JOIN categories c
    ON t.category_id = c.id
ORDER BY t.transaction_date DESC;


-- 3. Show the total expense for each category.
SELECT
    c.name AS category_name,
    SUM(t.amount) AS total_expense
FROM transactions t
JOIN categories c
    ON t.category_id = c.id
WHERE t.type = 'expense'
GROUP BY c.name
ORDER BY total_expense DESC;


-- 4. Show the total balance of all accounts owned by each user.
SELECT
    u.name AS user_name,
    SUM(a.balance) AS total_balance
FROM users u
JOIN accounts a
    ON u.id = a.user_id
GROUP BY u.id, u.name
ORDER BY total_balance DESC;


-- 5. Show the total number of transactions for each account.
SELECT
    a.name AS account_name,
    COUNT(t.id) AS transaction_count
FROM accounts a
LEFT JOIN transactions t
    ON a.id = t.account_id
GROUP BY a.id, a.name
ORDER BY transaction_count DESC;


-- 6. Show every category, including categories that have no transactions.
SELECT
    c.id,
    c.name AS category_name,
    c.type AS category_type,
    COUNT(t.id) AS transaction_count
FROM categories c
LEFT JOIN transactions t
    ON c.id = t.category_id
GROUP BY c.id, c.name, c.type
ORDER BY c.id;


-- 7. Show accounts whose balance is lower than the average balance of the same user.
SELECT
    a.id,
    a.name AS account_name,
    a.balance,
    u.name AS user_name
FROM accounts a
JOIN users u
    ON a.user_id = u.id
WHERE a.balance < (
    SELECT AVG(a2.balance)
    FROM accounts a2
    WHERE a2.user_id = a.user_id
)
ORDER BY u.name;


-- 8. Show monthly income and expense totals.
SELECT
    DATE_TRUNC('month', transaction_date) AS month,
    SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
    SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
FROM transactions
GROUP BY DATE_TRUNC('month', transaction_date)
ORDER BY month;


-- 9. Show the largest transaction made by each user.
SELECT
    u.name AS user_name,
    MAX(t.amount) AS largest_transaction
FROM users u
JOIN accounts a
    ON u.id = a.user_id
JOIN transactions t
    ON a.id = t.account_id
GROUP BY u.id, u.name
ORDER BY largest_transaction DESC;


-- 10. Show the top spending category for each user using a CTE and window function.
WITH user_category_expenses AS (
    SELECT
        u.id AS user_id,
        u.name AS user_name,
        c.name AS category_name,
        SUM(t.amount) AS total_spent
    FROM users u
    JOIN accounts a
        ON u.id = a.user_id
    JOIN transactions t
        ON a.id = t.account_id
    JOIN categories c
        ON t.category_id = c.id
    WHERE t.type = 'expense'
    GROUP BY u.id, u.name, c.name
),
ranked_expenses AS (
    SELECT
        user_name,
        category_name,
        total_spent,
        ROW_NUMBER() OVER (
            PARTITION BY user_id
            ORDER BY total_spent DESC
        ) AS rank_number
    FROM user_category_expenses
)
SELECT
    user_name,
    category_name,
    total_spent
FROM ranked_expenses
WHERE rank_number = 1
ORDER BY user_name;