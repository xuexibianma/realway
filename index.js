// index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint utama
app.get('/', (req, res) => {
  res.send('Halo dari Express.js!');
});

// Contoh endpoint API
app.get('/api/kabupaten', (req, res) => {
  res.json([
    { id: 1, nama: 'Badung' },
    { id: 2, nama: 'Gianyar' },
    { id: 3, nama: 'Denpasar' }
  ]);
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
