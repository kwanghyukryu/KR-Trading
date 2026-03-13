import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  const [rows] = await pool.query(
    'SELECT id, name, category, quantity, updated_at FROM products ORDER BY category, name'
  );
  res.json(rows);
});

router.put('/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  const quantity = Number(req.body.quantity);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid product id.' });
  }
  if (!Number.isFinite(quantity) || quantity < 0) {
    return res.status(400).json({ error: 'Quantity must be a non-negative number.' });
  }

  const [result] = await pool.query(
    'UPDATE products SET quantity = ?, updated_at = NOW() WHERE id = ?',
    [quantity, id]
  );

  if (result.affectedRows === 0) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  const [rows] = await pool.query(
    'SELECT id, name, category, quantity, updated_at FROM products WHERE id = ?',
    [id]
  );

  return res.json(rows[0]);
});

export default router;
