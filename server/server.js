require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// --- Authentication Middleware ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// --- API Routes ---

// Admin Login
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    if (password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: '12h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid password' });
    }
});

// Admin Refresh Token
app.post('/api/admin/refresh', authenticateToken, (req, res) => {
    // If the middleware passes, the current token is valid. Issue a new one.
    const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: '12h' });
    res.json({ token });
});

// Get Availability (Public)
// Returns list of blocked dates for all cabins or a specific cabin
app.get('/api/availability', (req, res) => {
    db.all(`SELECT cabin_id, start_date, end_date FROM blocks`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Get Cabins (Public)
app.get('/api/cabins', (req, res) => {
    db.all(`SELECT * FROM cabins`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// --- Protected Admin Routes ---

// Get all blocks (with details)
app.get('/api/admin/blocks', authenticateToken, (req, res) => {
    db.all(`SELECT * FROM blocks`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Add a new block (manual)
app.post('/api/admin/blocks', authenticateToken, (req, res) => {
    const { cabin_id, start_date, end_date, reason } = req.body;
    if (!cabin_id || !start_date || !end_date) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const stmt = db.prepare(`INSERT INTO blocks (cabin_id, start_date, end_date, reason) VALUES (?, ?, ?, ?)`);
    stmt.run([cabin_id, start_date, end_date, reason || 'manual'], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
    });
    stmt.finalize();
});

// Delete a block
app.delete('/api/admin/blocks/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM blocks WHERE id = ?`, id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ deleted: this.changes });
    });
});

// Get inquiries
app.get('/api/admin/inquiries', authenticateToken, (req, res) => {
    db.all(`SELECT * FROM inquiries ORDER BY created_at DESC`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

// --- Public Form Submission ---
app.post('/api/inquiries', (req, res) => {
    const { cabin_id, start_date, end_date, guest_name, guest_email, guest_phone, message } = req.body;
    
    const stmt = db.prepare(`INSERT INTO inquiries (cabin_id, start_date, end_date, guest_name, guest_email, guest_phone, message) VALUES (?, ?, ?, ?, ?, ?, ?)`);
    stmt.run([cabin_id, start_date, end_date, guest_name, guest_email, guest_phone, message], async function(err) {
        if (err) return res.status(500).json({ error: err.message });
        
        // Mock notification via SMS/WhatsApp alternative
        console.log(`[NOTIFICATION] New inquiry received from ${guest_name} for Cabin ${cabin_id || 'Any'} from ${start_date} to ${end_date}`);
        
        // --- RESEND EMAIL INTEGRATION (Prepared for desktop inquiries) ---
        // try {
        //   await resend.emails.send({
        //     from: 'rezerwacje@osadadzianisz.pl',
        //     to: 'wlascicielka@osadadzianisz.pl',
        //     subject: `Nowe zapytanie o rezerwację - ${guest_name}`,
        //     html: `<p><strong>Imię:</strong> ${guest_name}</p><p><strong>Telefon:</strong> ${guest_phone}</p><p><strong>Email:</strong> ${guest_email}</p><p><strong>Termin:</strong> ${start_date} do ${end_date}</p><p><strong>Wiadomość:</strong> ${message}</p>`
        //   });
        // } catch (emailErr) {
        //   console.error("Failed to send email via Resend", emailErr);
        // }
        // -----------------------------------------------------------------

        res.json({ id: this.lastID, success: true });
    });
    stmt.finalize();
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
