// ─────────────────────────────────────────────────────────────
//  Haven Orphanage Management System — Backend
//  server.js
// ─────────────────────────────────────────────────────────────

const express = require("express");
const Database = require("better-sqlite3");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
const PORT = 5000;
const SALT_ROUNDS = 10;

// ── Middleware ────────────────────────────────────────────────
app.use(cors());                      // allow React (port 5173) to call this
app.use(express.json());              // parse JSON request bodies

// ── Database Setup ────────────────────────────────────────────
const db = new Database("users.db"); // creates users.db file if it doesn't exist

// Create "users" table (runs once; ignored if table already exists)
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    email       TEXT    NOT NULL UNIQUE,
    password    TEXT    NOT NULL,
    role        TEXT    NOT NULL DEFAULT 'user',
    is_verified INTEGER NOT NULL DEFAULT 0
  )
`);

console.log("✅ Database ready — users table OK");

// ── Helper: send a clean error response ───────────────────────
function fail(res, status, message) {
  return res.status(status).json({ success: false, message });
}

// ─────────────────────────────────────────────────────────────
//  ROUTES
// ─────────────────────────────────────────────────────────────

// ── POST /signup ──────────────────────────────────────────────
//  Body: { name, email, password, role }
//  Creates a new user after hashing the password.
app.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  // --- Validation ---
  if (!name || !email || !password) {
    return fail(res, 400, "Name, email, and password are required.");
  }

  const validRoles = ["user", "admin"];
  const userRole = validRoles.includes(role) ? role : "user";

  // --- Check if email already exists ---
  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (existing) {
    return fail(res, 409, "An account with this email already exists.");
  }

  // --- Hash password ---
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // --- Insert user ---
  const insert = db.prepare(`
    INSERT INTO users (name, email, password, role, is_verified)
    VALUES (?, ?, ?, ?, 0)
  `);

  const result = insert.run(name, email, hashedPassword, userRole);

  return res.status(201).json({
    success: true,
    message: "Account created successfully.",
    user: {
      id: result.lastInsertRowid,
      name,
      email,
      role: userRole,
      is_verified: false,
    },
  });
});

// ── POST /login ───────────────────────────────────────────────
//  Body: { email, password }
//  Validates credentials and returns user info.
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // --- Validation ---
  if (!email || !password) {
    return fail(res, 400, "Email and password are required.");
  }

  // --- Find user by email ---
  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!user) {
    return fail(res, 401, "Invalid email or password.");
  }

  // --- Compare password with stored hash ---
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return fail(res, 401, "Invalid email or password.");
  }

  // --- Success — return user info (never return the password) ---
  return res.status(200).json({
    success: true,
    message: "Login successful.",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      is_verified: user.is_verified === 1,
    },
  });
});

// ── Health check ──────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "Haven API is running 🏠" });
});

// ── Start Server ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
