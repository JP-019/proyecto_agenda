const Ticket = require("../models/ticked");

// Crear un nuevo ticket
exports.CrearTicket = async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Hubo un error al crear el ticket");
  }
};

// Obtener todos los tickets
exports.ObtenerTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Hubo un error al obtener los tickets");
  }
};

// Buscar tickets por nombre de usuario
exports.BuscarPorNombre = async (req, res) => {
  try {
    const { nombre } = req.params;
    const tickets = await Ticket.find({ nombre: new RegExp(nombre, "i") });
    
    if (tickets.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron tickets para este usuario" });
    }
    res.json(tickets);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Hubo un error al buscar los tickets");
  }
};

// Actualizar un ticket por ID
exports.ActualizarTicket = async (req, res) => {
  try {
    const { estado, descripcion } = req.body;
    let ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ mensaje: "El ticket no existe" });
    }
    
    ticket.estado = estado || ticket.estado;
    ticket.descripcion = descripcion || ticket.descripcion;
    
    ticket = await Ticket.findByIdAndUpdate(req.params.id, ticket, { new: true });
    res.json(ticket);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Hubo un error al actualizar el ticket");
  }
};

// Obtener un ticket por ID
exports.ObtenerTicketPorId = async (req, res) => {
  try {
    let ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ mensaje: "El ticket no existe" });
    }
    res.json(ticket);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Hubo un error al obtener el ticket");
  }
};

// Eliminar un ticket por ID
exports.EliminarTicket = async (req, res) => {
  try {
    let ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ mensaje: "El ticket no existe" });
    }
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Ticket eliminado con éxito" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Hubo un error al eliminar el ticket");
  }
};