-- Clear existing data before inserting the seed data.
-- RESTART IDENTITY resets the SERIAL IDs back to 1.

TRUNCATE TABLE transactions, accounts, categories, users
RESTART IDENTITY CASCADE;


-- =====================================================
-- USERS
-- 3 users
-- =====================================================

INSERT INTO users (name, email, password, role)
VALUES
    ('Robby Arzy', 'robby@example.com', 'password123', 'user'),
    ('Amanda Wijaya', 'amanda@example.com', 'password123', 'user'),
    ('Kevin Tan', 'kevin@example.com', 'password123', 'user');


-- =====================================================
-- ACCOUNTS
-- 2 accounts for each user
-- =====================================================

INSERT INTO accounts (user_id, name, type, balance)
VALUES
    (1, 'BCA Savings', 'bank', 8500000.00),
    (1, 'GoPay Wallet', 'e-wallet', 350000.00),

    (2, 'Mandiri Savings', 'bank', 6200000.00),
    (2, 'Cash Wallet', 'cash', 500000.00),

    (3, 'BNI Savings', 'bank', 7300000.00),
    (3, 'OVO Wallet', 'e-wallet', 275000.00);


-- =====================================================
-- CATEGORIES
-- 3 income categories and 3 expense categories
-- =====================================================

INSERT INTO categories (name, type)
VALUES
    ('Salary', 'income'),
    ('Freelance', 'income'),
    ('Bonus', 'income'),
    ('Food', 'expense'),
    ('Transportation', 'expense'),
    ('Entertainment', 'expense');


-- =====================================================
-- TRANSACTIONS
-- 24 transactions across different accounts and dates
-- =====================================================

INSERT INTO transactions (
    account_id,
    category_id,
    type,
    amount,
    description,
    transaction_date
)
VALUES
    -- Robby's BCA Savings account
    (1, 1, 'income', 7000000.00, 'January salary', '2026-01-25'),
    (1, 4, 'expense', 125000.00, 'Weekly groceries', '2026-01-27'),
    (1, 5, 'expense', 50000.00, 'Fuel purchase', '2026-01-29'),
    (1, 2, 'income', 1500000.00, 'Website freelance project', '2026-02-05'),

    -- Robby's GoPay Wallet
    (2, 4, 'expense', 35000.00, 'Lunch order', '2026-02-07'),
    (2, 5, 'expense', 22000.00, 'Online motorcycle ride', '2026-02-08'),
    (2, 6, 'expense', 65000.00, 'Cinema ticket', '2026-02-10'),
    (2, 4, 'expense', 28000.00, 'Coffee and snack', '2026-02-12'),

    -- Amanda's Mandiri Savings account
    (3, 1, 'income', 6500000.00, 'January salary', '2026-01-25'),
    (3, 4, 'expense', 450000.00, 'Monthly groceries', '2026-01-28'),
    (3, 5, 'expense', 200000.00, 'Transportation expenses', '2026-02-01'),
    (3, 3, 'income', 750000.00, 'Performance bonus', '2026-02-03'),

    -- Amanda's Cash Wallet
    (4, 4, 'expense', 40000.00, 'Lunch at restaurant', '2026-02-06'),
    (4, 5, 'expense', 30000.00, 'Parking fee', '2026-02-07'),
    (4, 6, 'expense', 100000.00, 'Concert ticket', '2026-02-11'),
    (4, 4, 'expense', 55000.00, 'Dinner with friends', '2026-02-13'),

    -- Kevin's BNI Savings account
    (5, 1, 'income', 6800000.00, 'January salary', '2026-01-25'),
    (5, 2, 'income', 900000.00, 'Logo design project', '2026-02-02'),
    (5, 4, 'expense', 375000.00, 'Monthly groceries', '2026-02-04'),
    (5, 5, 'expense', 175000.00, 'Monthly transportation', '2026-02-06'),

    -- Kevin's OVO Wallet
    (6, 4, 'expense', 32000.00, 'Food delivery', '2026-02-08'),
    (6, 5, 'expense', 25000.00, 'Online taxi ride', '2026-02-09'),
    (6, 6, 'expense', 75000.00, 'Streaming subscription', '2026-02-12'),
    (6, 4, 'expense', 45000.00, 'Dinner order', '2026-02-14');