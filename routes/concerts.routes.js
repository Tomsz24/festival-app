const express = require("express");
const router = express.Router();
const db = require("../db");
const concerts = db.concerts;

router.route("/concerts").get((req, res) => {
  res.json(concerts);
});
router.route("/concerts/random").get((req, res) => {
  const id = Math.floor(Math.random() * concerts.length + 0);
  const record = concerts.find((el) => el.id == id);
  res.json(record);
});

router.route("/concerts/:id").get((req, res) => {
  const record = concerts.find((el) => el.id == req.params.id);
  res.json(record);
});
router.route("/concerts").post((req, res) => {
  const { performer, genre, price, day } = req.body;
  const newRecord = {};
  newRecord.id = Math.random().toString(26).slice(2);
  newRecord.performer = performer;
  newRecord.genre = genre;
  newRecord.price = price;
  newRecord.day = day;
  concerts.push(newRecord);
  res.json({ message: "OK" });
});

router.route("/concerts/:id").put((req, res) => {
  const { performer, genre, price, day } = req.body;
  const record = concerts.find((el) => el.id == req.params.id);
  record.performer = performer;
  record.genre = genre;
  record.price = price;
  record.day = day;
  res.json({ message: "OK" });
});
router.route("/concerts/:id").delete((req, res) => {
  const record = concerts.find((el) => el.id == req.params.id);
  const recordIndex = concerts.indexOf(record);
  concerts.splice(recordIndex, 1);
  res.json({ message: "OK" });
});

module.exports = router;