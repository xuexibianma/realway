const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); // opsional, hanya untuk local dev

const app = express();
const port = process.env.PORT || 3000;

// Koneksi ke MySQL via Railway
const sequelize = new Sequelize(process.env.MYSQL_URL, {
  dialect: 'mysql',
  logging: false,
});

// Model Kabupaten
const Kabupaten = sequelize.define('Kabupaten', {
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'kabupaten',
  timestamps: false,
});

// Middleware
app.use(express.json());

// Endpoint API
app.get('/api/kabupaten', async (req, res) => {
  try {
    const data = await Kabupaten.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil data' });
  }
});

// Sync DB & Start Server
sequelize.authenticate()
  .then(() => {
    console.log('✅ Koneksi ke database berhasil.');

    return sequelize.sync(); // Sync model ke DB (jika belum ada tabel, akan dibuat)
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server jalan di http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Gagal konek ke database:', err);
  });
