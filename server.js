const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route racine
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenue sur l\'API Kotlin IIA' });
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
        if (plage.rows.length === 0) {
            return res.status(404).json({ error: "Plage non trouvée" });
        }
        res.json(plage.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.post('/api/plages', async (req, res) => {
    try {
        const { nom, description, image } = req.body;
        const newPlage = await pool.query(
            'INSERT INTO Plages (nom, description, image) VALUES ($1, $2, $3) RETURNING *',
            [nom, description, image]
        );
        res.status(201).json(newPlage.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.put('/api/plages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, description, image } = req.body;
        const updatePlage = await pool.query(
            'UPDATE Plages SET nom = $1, description = $2, image = $3 WHERE id = $4 RETURNING *',
            [nom, description, image, id]
        );
        if (updatePlage.rows.length === 0) {
            return res.status(404).json({ error: "Plage non trouvée" });
        }
        res.json(updatePlage.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.delete('/api/plages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletePlage = await pool.query('DELETE FROM Plages WHERE id = $1 RETURNING *', [id]);
        if (deletePlage.rows.length === 0) {
            return res.status(404).json({ error: "Plage non trouvée" });
        }
        res.json({ message: "Plage supprimée avec succès" });
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
        if (piece.rows.length === 0) {
            return res.status(404).json({ error: "Pièce non trouvée" });
        }
        res.json(piece.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.post('/api/pieces', async (req, res) => {
    try {
        const { nom, description, image } = req.body;
        const newPiece = await pool.query(
            'INSERT INTO PiecesMeca (nom, description, image) VALUES ($1, $2, $3) RETURNING *',
            [nom, description, image]
        );
        res.status(201).json(newPiece.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.put('/api/pieces/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, description, image } = req.body;
        const updatePiece = await pool.query(
            'UPDATE PiecesMeca SET nom = $1, description = $2, image = $3 WHERE id = $4 RETURNING *',
            [nom, description, image, id]
        );
        if (updatePiece.rows.length === 0) {
            return res.status(404).json({ error: "Pièce non trouvée" });
        }
        res.json(updatePiece.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.delete('/api/pieces/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletePiece = await pool.query('DELETE FROM PiecesMeca WHERE id = $1 RETURNING *', [id]);
        if (deletePiece.rows.length === 0) {
            return res.status(404).json({ error: "Pièce non trouvée" });
        }
        res.json({ message: "Pièce supprimée avec succès" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// Routes pour les voitures RL
app.get('/api/voitures', async (req, res) => {
    try {
        const voitures = await pool.query('SELECT * FROM voiture_rl');
        res.json(voitures.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.get('/api/voitures/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const voiture = await pool.query('SELECT * FROM voiture_rl WHERE id = $1', [id]);
        if (voiture.rows.length === 0) {
            return res.status(404).json({ error: "Voiture non trouvée" });
        }
        res.json(voiture.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.post('/api/voitures', async (req, res) => {
    try {
        const { nom, description, image, hitbox, date_sortie } = req.body;
        const newVoiture = await pool.query(
            'INSERT INTO voiture_rl (nom, description, image, hitbox, date_sortie) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nom, description, image, hitbox, date_sortie]
        );
        res.status(201).json(newVoiture.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.put('/api/voitures/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, description, image, hitbox, date_sortie } = req.body;
        const updateVoiture = await pool.query(
            'UPDATE voiture_rl SET nom = $1, description = $2, image = $3, hitbox = $4, date_sortie = $5 WHERE id = $6 RETURNING *',
            [nom, description, image, hitbox, date_sortie, id]
        );
        if (updateVoiture.rows.length === 0) {
            return res.status(404).json({ error: "Voiture non trouvée" });
        }
        res.json(updateVoiture.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.delete('/api/voitures/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteVoiture = await pool.query('DELETE FROM voiture_rl WHERE id = $1 RETURNING *', [id]);
        if (deleteVoiture.rows.length === 0) {
            return res.status(404).json({ error: "Voiture non trouvée" });
        }
        res.json({ message: "Voiture supprimée avec succès" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// Routes pour les artistes
app.get('/api/artistes', async (req, res) => {
    try {
        const artistes = await pool.query('SELECT * FROM artistes');
        res.json(artistes.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.get('/api/artistes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const artiste = await pool.query('SELECT * FROM artistes WHERE id = $1', [id]);
        if (artiste.rows.length === 0) {
            return res.status(404).json({ error: "Artiste non trouvé" });
        }
        res.json(artiste.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.post('/api/artistes', async (req, res) => {
    try {
        const { nom, genre, description, image, date_creation } = req.body;
        const newArtiste = await pool.query(
            'INSERT INTO artistes (nom, genre, description, image, date_creation) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nom, genre, description, image, date_creation]
        );
        res.status(201).json(newArtiste.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.put('/api/artistes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, genre, description, image, date_creation } = req.body;
        const updateArtiste = await pool.query(
            'UPDATE artistes SET nom = $1, genre = $2, description = $3, image = $4, date_creation = $5 WHERE id = $6 RETURNING *',
            [nom, genre, description, image, date_creation, id]
        );
        if (updateArtiste.rows.length === 0) {
            return res.status(404).json({ error: "Artiste non trouvé" });
        }
        res.json(updateArtiste.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

app.delete('/api/artistes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteArtiste = await pool.query('DELETE FROM artistes WHERE id = $1 RETURNING *', [id]);
        if (deleteArtiste.rows.length === 0) {
            return res.status(404).json({ error: "Artiste non trouvé" });
        }
        res.json({ message: "Artiste supprimé avec succès" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});