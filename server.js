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
app.post('/api/meetings', (req, res) => {
  const newMeeting = { id: meetings.length + 1, ...req.body };
  meetings.push(newMeeting);
  res.status(201).json(newMeeting);
});

// Endpoint untuk menghapus ruang meeting berdasarkan ID
app.delete('/api/meetings/:id', (req, res) => {
  const meetingId = parseInt(req.params.id);
  meetings = meetings.filter(meeting => meeting.id !== meetingId);
  res.status(200).json({ message: "Meeting deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
