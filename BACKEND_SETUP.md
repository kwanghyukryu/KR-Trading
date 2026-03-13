# KR Trading Backend Setup (MySQL)

## 1) Create database and tables

```sql
CREATE DATABASE IF NOT EXISTS kr_trading;
USE kr_trading;
SOURCE server/sql/schema.sql;
```

## 2) Configure backend env

Copy and edit backend env file:

```bash
cd server
cp .env.example .env
```

Set these values in `server/.env`:
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `JWT_SECRET`

## 3) Install backend deps and run API

```bash
cd server
npm install
npm run dev
```

API will run on `http://localhost:4000`.

## 4) Create admin account

```bash
cd server
npm run create-admin -- admin@example.com your_password_here
```

## 5) Configure frontend API URL

In project root, ensure `.env` has:

```env
VITE_API_BASE_URL=http://localhost:4000
```

Then run frontend:

```bash
npm install
npm run dev
```

Visit:
- Website: `http://localhost:5173/`
- Admin: `http://localhost:5173/admin`
