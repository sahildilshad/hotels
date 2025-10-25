const express = require("express");
const router = express.Router();

const MenuItem = require("../models/Menu");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);

    const response = await newMenu.save();
    console.log("menu saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "interval server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fected");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    if (taste == "sweet" || taste == "spicy" || taste == "sour") {
      const response = await MenuItem.find({ taste: taste });
      console.log("data fected");
      res.status(200).json(response);
    }
    else{
      res.status(404).json({error:"invalid type"})
      
    }
  } catch (error) {
    console.log(error);
    
    res.status(404).json({error:"invalid type"})
  }
});

// add an commment

module.exports = router;
