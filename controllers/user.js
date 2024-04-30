
// Acciones de prueba
const pruebaUser = (req, res) => {
    return res.status(200).send({
        mensaje: "Mensaje enviado desde controllador controller/user.js"
    });

}

// Exportar acciones
module.exports = {
    pruebaUser
}

