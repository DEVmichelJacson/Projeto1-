require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

async function getPool(){
  const pool = await mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'projeto1',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  return pool;
}

// health
app.get('/api/health', (req,res)=> res.json({ ok: true, now: new Date().toISOString() }));

// POST /api/contact
app.post('/api/contact', async (req,res)=>{
  const { name, email, message } = req.body || {};
  if(!name || !email || !message){
    return res.status(400).json({ error: 'name, email and message are required' });
  }

  try{
    const pool = await getPool();
    const [result] = await pool.execute(
      'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    );
    // result.insertId available
    res.status(201).json({ ok: true, id: result.insertId });
  }catch(err){
    console.error('db error', err);
    res.status(500).json({ error: 'internal_server_error', details: err.message });
  }
});

app.listen(PORT, ()=>{
  console.log(`API running on http://localhost:${PORT}`);
});
