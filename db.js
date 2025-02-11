const { Pool } = require('pg'); 
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Ajouter des listeners d'événements
pool.on('connect', () => {
    console.log('Base de données connectée avec succès');
});

pool.on('error', (err) => {
    console.error('Erreur de connexion:', err);
    console.log('Configuration:', {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    });
});

module.exports = pool;