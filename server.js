const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

// Au début de server.js
console.log('Variables d\'environnement:', {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
    PORT: process.env.PORT
});

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Bienvenue sur l'API Kotlin IIA" });
});

// Routes pour les plages
app.get('/api/plages', async (req, res) => {
    try {
        const plages = await pool.query('SELECT * FROM Plages');
        res.json(plages.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.get('/api/plages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const plage = await pool.query('SELECT * FROM Plages WHERE id = $1', [id]);
        res.json(plage.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// Routes pour les pièces méca
app.get('/api/pieces', async (req, res) => {
    try {
        const pieces = await pool.query('SELECT * FROM PiecesMeca');
        res.json(pieces.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.get('/api/pieces/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const piece = await pool.query('SELECT * FROM PiecesMeca WHERE id = $1', [id]);
        res.json(piece.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;

// Dans server.js, avant app.listen()
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
    } else {
        console.log('Connexion à la base de données réussie');
    }
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});