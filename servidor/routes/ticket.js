const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketcontroller');

// Crear un nuevo ticket
router.post('/', ticketController.CrearTicket);

// Obtener todos los tickets
router.get('/', ticketController.ObtenerTickets);

// Obtener un ticket por ID
router.get('/:id', ticketController.ObtenerTicketPorId);

// Buscar tickets por nombre de quien tomó la herramienta
router.get('/nombre/:nombre', ticketController.BuscarPorNombre);

// Actualizar un ticket por ID
router.put('/:id', ticketController.ActualizarTicket);

// Eliminar un ticket por ID
router.delete('/:id', ticketController.EliminarTicket);

module.exports = router;
