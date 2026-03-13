import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import inventoryRoutes from './routes/inventory.js';

if (!process.env.JWT_SECRET) {
  throw new Error('Missing required environment variable: JWT_SECRET');
}

const app = express();
const port = Number(process.env.PORT || 4000);
const host = process.env.HOST || '127.0.0.1';

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:5173'] }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/admin', authRoutes);
app.use('/api/inventory', inventoryRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(port, host, () => {
  console.log(`API running on http://${host}:${port}`);
});
