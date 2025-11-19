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

router.get("/", async (req, res) => {
  try {
    const { status, search } = req.query;
    let filter = {};
    
    // Only filter by status if it's not "All Status"
    if (status && status !== "All Status") {
      filter.status = status;
    }
    
    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [
        { name: regex }, 
        { company: regex }  
      ];
    }
    
    const contacts = await Contact.find(filter).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;