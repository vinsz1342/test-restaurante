const express = require("express");
const router = express.Router();
const restauranteController = require("../controllers/restaurantesController");

router.post("/", restauranteController.createRestaurante);
router.get("/", restauranteController.getRestaurantes);
router.get("/:id", restauranteController.getRestauranteById);
router.delete("/:id", restauranteController.deleteRestaurante);
router.patch("/:id", restauranteController.updateRestaurante);

module.exports = router;
