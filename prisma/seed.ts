import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});


const prisma = new PrismaClient({
  adapter,
});


async function main() {
  console.log("🌱 Starting database seed...");


  // Clear existing data
  await prisma.transactions.deleteMany();
  await prisma.accounts.deleteMany();
  await prisma.categories.deleteMany();
  await prisma.users.deleteMany();
  await prisma.$executeRawUnsafe(`
  ALTER SEQUENCE users_id_seq RESTART WITH 1;
  ALTER SEQUENCE accounts_id_seq RESTART WITH 1;
  ALTER SEQUENCE categories_id_seq RESTART WITH 1;
  ALTER SEQUENCE transactions_id_seq RESTART WITH 1;
  `);


  // ======================
  // USERS
  // ======================

  await prisma.users.createMany({
    data: [
      {
        name: "Robby Arzy",
        email: "robby@example.com",
        password: "password123",
        role: "user",
      },
      {
        name: "Amanda Wijaya",
        email: "amanda@example.com",
        password: "password123",
        role: "user",
      },
      {
        name: "Kevin Tan",
        email: "kevin@example.com",
        password: "password123",
        role: "user",
      },
    ],
  });


  // ======================
  // ACCOUNTS
  // ======================

  await prisma.accounts.createMany({
    data: [
      {
        user_id: 1,
        name: "BCA Savings",
        type: "bank",
        balance: 8500000,
      },
      {
        user_id: 1,
        name: "GoPay Wallet",
        type: "e-wallet",
        balance: 350000,
      },
      {
        user_id: 2,
        name: "Mandiri Savings",
        type: "bank",
        balance: 6200000,
      },
      {
        user_id: 2,
        name: "Cash Wallet",
        type: "cash",
        balance: 500000,
      },
      {
        user_id: 3,
        name: "BNI Savings",
        type: "bank",
        balance: 7300000,
      },
      {
        user_id: 3,
        name: "OVO Wallet",
        type: "e-wallet",
        balance: 275000,
      },
    ],
  });


  // ======================
  // CATEGORIES
  // ======================

  await prisma.categories.createMany({
    data: [
      {
        name: "Salary",
        type: "income",
      },
      {
        name: "Freelance",
        type: "income",
      },
      {
        name: "Bonus",
        type: "income",
      },
      {
        name: "Food",
        type: "expense",
      },
      {
        name: "Transportation",
        type: "expense",
      },
      {
        name: "Entertainment",
        type: "expense",
      },
    ],
  });


  // ======================
  // TRANSACTIONS
  // ======================

  await prisma.transactions.createMany({
    data: [
      {
        account_id: 1,
        category_id: 1,
        type: "income",
        amount: 7000000,
        description: "January salary",
        transaction_date: new Date("2026-01-25"),
      },
      {
        account_id: 1,
        category_id: 4,
        type: "expense",
        amount: 125000,
        description: "Weekly groceries",
        transaction_date: new Date("2026-01-27"),
      },
      {
        account_id: 1,
        category_id: 5,
        type: "expense",
        amount: 50000,
        description: "Fuel purchase",
        transaction_date: new Date("2026-01-29"),
      },
      {
        account_id: 1,
        category_id: 2,
        type: "income",
        amount: 1500000,
        description: "Website freelance project",
        transaction_date: new Date("2026-02-05"),
      },

      {
        account_id: 2,
        category_id: 4,
        type: "expense",
        amount: 35000,
        description: "Lunch order",
        transaction_date: new Date("2026-02-07"),
      },
      {
        account_id: 2,
        category_id: 5,
        type: "expense",
        amount: 22000,
        description: "Online motorcycle ride",
        transaction_date: new Date("2026-02-08"),
      },
      {
        account_id: 2,
        category_id: 6,
        type: "expense",
        amount: 65000,
        description: "Cinema ticket",
        transaction_date: new Date("2026-02-10"),
      },
      {
        account_id: 2,
        category_id: 4,
        type: "expense",
        amount: 28000,
        description: "Coffee and snack",
        transaction_date: new Date("2026-02-12"),
      },

      {
        account_id: 3,
        category_id: 1,
        type: "income",
        amount: 6500000,
        description: "January salary",
        transaction_date: new Date("2026-01-25"),
      },
      {
        account_id: 3,
        category_id: 4,
        type: "expense",
        amount: 450000,
        description: "Monthly groceries",
        transaction_date: new Date("2026-01-28"),
      },
      {
        account_id: 3,
        category_id: 5,
        type: "expense",
        amount: 200000,
        description: "Transportation expenses",
        transaction_date: new Date("2026-02-01"),
      },
      {
        account_id: 3,
        category_id: 3,
        type: "income",
        amount: 750000,
        description: "Performance bonus",
        transaction_date: new Date("2026-02-03"),
      },

      {
        account_id: 4,
        category_id: 4,
        type: "expense",
        amount: 40000,
        description: "Lunch at restaurant",
        transaction_date: new Date("2026-02-06"),
      },
      {
        account_id: 4,
        category_id: 5,
        type: "expense",
        amount: 30000,
        description: "Parking fee",
        transaction_date: new Date("2026-02-07"),
      },
      {
        account_id: 4,
        category_id: 6,
        type: "expense",
        amount: 100000,
        description: "Concert ticket",
        transaction_date: new Date("2026-02-11"),
      },
      {
        account_id: 4,
        category_id: 4,
        type: "expense",
        amount: 55000,
        description: "Dinner with friends",
        transaction_date: new Date("2026-02-13"),
      },

      {
        account_id: 5,
        category_id: 1,
        type: "income",
        amount: 6800000,
        description: "January salary",
        transaction_date: new Date("2026-01-25"),
      },
      {
        account_id: 5,
        category_id: 2,
        type: "income",
        amount: 900000,
        description: "Logo design project",
        transaction_date: new Date("2026-02-02"),
      },
      {
        account_id: 5,
        category_id: 4,
        type: "expense",
        amount: 375000,
        description: "Monthly groceries",
        transaction_date: new Date("2026-02-04"),
      },
      {
        account_id: 5,
        category_id: 5,
        type: "expense",
        amount: 175000,
        description: "Monthly transportation",
        transaction_date: new Date("2026-02-06"),
      },

      {
        account_id: 6,
        category_id: 4,
        type: "expense",
        amount: 32000,
        description: "Food delivery",
        transaction_date: new Date("2026-02-08"),
      },
      {
        account_id: 6,
        category_id: 5,
        type: "expense",
        amount: 25000,
        description: "Online taxi ride",
        transaction_date: new Date("2026-02-09"),
      },
      {
        account_id: 6,
        category_id: 6,
        type: "expense",
        amount: 75000,
        description: "Streaming subscription",
        transaction_date: new Date("2026-02-12"),
      },
      {
        account_id: 6,
        category_id: 4,
        type: "expense",
        amount: 45000,
        description: "Dinner order",
        transaction_date: new Date("2026-02-14"),
      },
    ],
  });


  console.log("✅ Database seeded successfully!");
}


main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });