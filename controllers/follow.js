
// Acciones de prueba
const pruebaFollow = (req, res) => {
    return res.status(200).send({
        mensaje: "Mensaje enviado desde controllador controller/follow.js"
    });

}

// Exportar acciones
module.exports = {
    pruebaFollow
}

