# Open-Source-Contribution-Backend

> Backend REST API for the Open-Source Beginner Guide interactive platform.

## 🚀 Features
- **MVC Architecture**: Express.js with clear separation of Controllers, Services, Models, Routes, and Middleware.
- **Authentication**: Custom JWT authentication with password hashing via `bcryptjs` (work factor 12).
- **Security**: Hardened with Helmet HTTP headers, CORS origin whitelisting, rate limiting on sensitive auth endpoints, and centralized error handling.
- **Database**: PostgreSQL / Supabase with Row Level Security (RLS) policies and automatic in-memory fallback for zero-config offline local development.
- **Integrations**: Real-time GitHub REST API explorer with caching, plus an AI learning assistant service abstraction.
- **Validation**: Strict schema validation on all incoming request bodies, queries, and params using Zod.

---

## 🛠️ Tech Stack
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: PostgreSQL / Supabase
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **Validation**: Zod
- **Testing**: Vitest & Supertest

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```
*(The backend runs out-of-the-box with a built-in store if external Supabase credentials are not provided).*

### 3. Start Development Server
```bash
npm run dev
```
The server will start on `http://localhost:5000/api`.

### 4. Run Automated Tests
```bash
npm test
```

---

## 🗄️ Database Setup (Optional)
To connect a live Supabase PostgreSQL database:
1. Open the SQL Editor in your Supabase project dashboard.
2. Run `database/schema.sql` to create all tables, indexes, and RLS policies.
3. Run `database/seed.sql` to populate default achievements, lessons, and quizzes.
4. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in your `.env` file.

---

## 📄 License
MIT License.
