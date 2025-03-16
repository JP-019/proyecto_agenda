const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Conectar a la base de datos
conectarDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/productos', require('./routes/productos'));
app.use('/api/tickets', require('./routes/ticket'));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
    console.log(`http://localhost:${PORT}/`);
});
