const express = require("express");
const mongoose = require("mongoose");
const restauranteRoutes = require("../src/routes/restaurantesRoutes");
const productRoutes = require("../src/routes/productRoutes");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

mongoose.connect("mongodb://localhost:27017/restauranteDB");

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Error de conexión:", error);
});

db.once("open", () => {
  console.log("¡Conexión exitosa a la base de datos!");
});

app.use("/api/restaurantes", restauranteRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
