const express = require('express');
const cors = require('cors');

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// Simulasi database sederhana
let meetings = [];

// Endpoint untuk mendapatkan semua ruang meeting
app.get('/api/meetings', (req, res) => {
  res.json(meetings);
});

// Endpoint untuk menambahkan ruang meeting baru
app.post(
  '/meetings',
  [
    body('unit').notEmpty().withMessage('Unit harus diisi'),
    body('ruangMeeting').notEmpty().withMessage('Ruang Meeting harus diisi'),
    body('tanggalRapat').notEmpty().withMessage('Tanggal Rapat harus diisi'),
    body('kapasitas').notEmpty().withMessage('kapasitas harus diisi'),
    body('waktuMulai').isIn(waktuOptions).withMessage('Waktu Mulai tidak valid'),
    body('waktuSelesai').isIn(waktuOptions).withMessage('Waktu Selesai tidak valid'),
    body('jumlahPeserta').isInt({ min: 1 }).withMessage('Jumlah Peserta harus angka positif'),
    body('jenisKonsumsi.snackSiang').isBoolean().withMessage('Jenis Konsumsi harus boolean'),
    body('jenisKonsumsi.makanSiang').isBoolean().withMessage('Jenis Konsumsi harus boolean'),
    body('jenisKonsumsi.snackSore').isBoolean().withMessage('Jenis Konsumsi harus boolean'),
    body('nominalKonsumsi.snackSore').isBoolean().withMessage('Nominal Konsumsi harus boolean'),

  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const newMeeting = req.body;
    meetings.push(newMeeting);
    res.status(201).json(newMeeting);
  }
);

// Endpoint untuk menghapus ruang meeting berdasarkan ID
app.delete('/api/meetings/:id', (req, res) => {
  const meetingId = parseInt(req.params.id);
  meetings = meetings.filter(meeting => meeting.id !== meetingId);
  res.status(200).json({ message: "Meeting deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
