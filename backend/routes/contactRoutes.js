import express from "express";
import Contact from "../models/contact.js";

const router = express.Router();

// Routes will be added here

router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
