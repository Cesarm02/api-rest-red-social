// Importar dependencias
const jwt = require("jwt-simple");
const moment = require("moment");

// Clave secreta
const secret = "CESARM02_RED_SOCIAL";

// Crear función de genrar token
const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        
    }
}

// Devolver jwt token

