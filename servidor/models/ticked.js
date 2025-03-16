const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    fecha: { type: String, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    herramienta: { type: String, required: true },
    stock_tomado: { type: Number, required: true },
    estado: { type: String, enum: ['pendiente', 'aprobado', 'rechazado'], required: true },
    registro: { type: String, default: "Registro generado automáticamente" }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
