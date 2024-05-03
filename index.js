//Importar dependencias
const connection = require("./database/connection");
const express = require("express");
const cors = require("cors");

//Mensaje de bienvenida
console.log("API NODE para red social iniciada");

// Conexión a base de datos
connection();

// Crear servidor Node
const app = express();
const puerto = 3900;

// Configurar el cors
app.use(cors());

// Convertir los datos del body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Cargar las rutas
const userRouter = require("./routers/user");
const publicationRouter = require("./routers/publication");
const followRouter = require("./routers/follow");

app.use("/api/user", userRouter);
app.use("/api/publication", publicationRouter);
app.use("/api/follow", followRouter);


//Ruta de prueba
app.get("/ruta-prueba", (req, res) => {
    
    return res.status(200).json(
        {
            "id": 1,
            "nombre": "cesar"
        }
    );

});

// Poner servidor a escuchar
app.listen(puerto, () => {
    console.log("Servidor de node iniciado");
})