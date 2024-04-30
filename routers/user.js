const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

//Definir rutas
router.get("/prueba-usuario", userController.pruebaUser);

//Exportar el router
module.exports = router;