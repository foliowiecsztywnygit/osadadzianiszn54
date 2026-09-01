const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dataDir = path.resolve(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const dbPath = path.resolve(dataDir, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // Initialize tables
        db.serialize(() => {
            // Cabins table
            db.run(`CREATE TABLE IF NOT EXISTS cabins (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL
            )`);

            // Insert default cabins if not exists
            db.get("SELECT COUNT(*) AS count FROM cabins", (err, row) => {
                if (row && row.count === 0) {
                    const stmt = db.prepare("INSERT INTO cabins (name) VALUES (?)");
                    stmt.run("Domek 1");
                    stmt.run("Domek 2");
                    stmt.run("Domek 3");
                    stmt.finalize();
                }
            });

            // Blocks table (reservations and manual blocks)
            db.run(`CREATE TABLE IF NOT EXISTS blocks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                cabin_id INTEGER NOT NULL,
                start_date TEXT NOT NULL, -- YYYY-MM-DD
                end_date TEXT NOT NULL,   -- YYYY-MM-DD
                reason TEXT,              -- 'reservation', 'maintenance', etc.
                inquiry_id INTEGER,       -- null if manual block
                FOREIGN KEY(cabin_id) REFERENCES cabins(id)
            )`);

            // Inquiries table (optional, but good for saving requests)
            db.run(`CREATE TABLE IF NOT EXISTS inquiries (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                cabin_id INTEGER,
                start_date TEXT,
                end_date TEXT,
                guest_name TEXT,
                guest_email TEXT,
                guest_phone TEXT,
                message TEXT,
                status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'rejected'
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`, () => {
                db.run("ALTER TABLE inquiries ADD COLUMN guest_count INTEGER", () => {});
                db.run("ALTER TABLE inquiries ADD COLUMN children_under_3 INTEGER", () => {});
                db.run("ALTER TABLE inquiries ADD COLUMN children_over_3 INTEGER", () => {});
            });
        });
    }
});

module.exports = db;
