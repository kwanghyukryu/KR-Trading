import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const [rows] = await pool.query('SELECT id, email, password_hash FROM admins WHERE email = ? LIMIT 1', [email]);
  const admin = rows[0];
  if (!admin) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const isValid = await bcrypt.compare(password, admin.password_hash);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const token = jwt.sign(
    { adminId: admin.id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  return res.json({ token, admin: { id: admin.id, email: admin.email } });
});

export default router;
