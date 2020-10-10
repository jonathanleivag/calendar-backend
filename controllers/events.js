const { response, request } = require("express");
const Event = require("../models/Event");

const getEvent = async (req = request, res = response) => {
  const events = await Event.find().populate("user", "name");
  res.json({ ok: true, events });
};

const createEvent = async (req = request, res = response) => {
  const event = new Event(req.body);
  try {
    event.user = req.uid;
    const eventSave = await event.save();
    res.json({ ok: true, event: eventSave });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "Hable con el administrador" });
  }
};

const updateEvent = async (req = request, res = response) => {
  const eventId = req.params.id;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ ok: false, msg: "El evento no existe" });
    }

    if (event.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene previlegio para actulizar este evento",
      });
    }

    const newEvent = { ...req.body, user: req.uid };
    const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });
    return res.json({ ok: true, event: eventUpdated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: "Hable con el administrador" });
  }
};

const deleteEvent = async (req = request, res = response) => {
  const eventId = req.params.id;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ ok: false, msg: "El evento no existe" });
    }

    if (event.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene previlegio para eliminar este evento",
      });
    }

    await Event.findByIdAndDelete(eventId);
    return res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false });
  }
};

module.exports = { getEvent, createEvent, updateEvent, deleteEvent };
