const express = require("express");
const router = express.Router();
const person = require("../models/person");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new person(data);

    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await person.find();
    console.log("data fected");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await person.find({ work: workType });
      console.log(`response fetched`);
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Invalid work type" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personid = req.params.id;
    const updatedPersonData = req.body;
    //  console.log("Request body:", updatedPersonData);
    const response = await person.findByIdAndUpdate(
      personid,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      return res.status(404).json({ error: "person not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Invalid work type" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personid = req.params.id;
    const response = await person.findByIdAndDelete(personid);
    console.log('data deleted')
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "invalid data" });
  }
});

module.exports = router;
