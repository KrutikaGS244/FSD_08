const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/productsdb")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Product = mongoose.model("Product", ProductSchema);

app.post("/products", async (req, res) => {

  const products = new Product(req.body);

  await products.save();

  res.json(products);
});

app.get("/products", async (req, res) => {

  const products = await Product.find();

  res.json(products);
});

app.put("/products/:id", async (req, res) => {

  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
});

app.delete("/products/:id", async (req, res) => {

  await Product.findByIdAndDelete(req.params.id);

  res.json({ message: "Deleted" });
});

app.listen(5000, () => {
  console.log("Server Running On Port 5000");
});