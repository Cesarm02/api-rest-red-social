
// Acciones de prueba
const pruebaPublication = (req, res) => {
    return res.status(200).send({
        mensaje: "Mensaje enviado desde controllador controller/publication.js"
    });

}

// Exportar acciones
module.exports = {
    pruebaPublication
}

