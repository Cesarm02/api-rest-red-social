//Importar dependencias
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Acciones de prueba
const pruebaUser = (req, res) => {
  return res.status(200).send({
    message: "Mensaje enviado desde controllador controller/user.js",
  });
};

// Registro de usuarios
const register = (req, res) => {
  //Recoger datos de la petición
  let params = req.body;
  console.log(params);

  //Comprobar que me llegan (validación)
  if (!params.name || !params.email || !params.password || !params.nick) {
    console.log("Validación incorrecta");

    return res.status(400).json({
      message: "Faltan datos para enviar",
      status: "Error",
    });
  }

  //Crear objeto de usuario
  let user_to_save = new User(params);

  //Control usuarios duplicados
  User.find({
    $or: [
      { email: user_to_save.email.toLowerCase() },
      { nick: user_to_save.nick.toLowerCase() },
    ],
  })
    .then((users) => {
      if (users.length >= 1) {
        return res.status(200).send({
          status: "Sucess",
          message: "Usuario ya existe",
        });
      }

      // Cifrar la contraseña
      bcrypt.hash(user_to_save.password, 10, (error, pwd) => {
        user_to_save.password = pwd;

        //Guardar usuario en bd
        user_to_save.save() .then((userStored) => {
          if ( !userStored){
            return res
            .status(500)
            .send({
              status: "Error",
              message: "Error al guardar el usuario",
            });
          }
            //Retornar resultado
            return res.status(200).json({
              message: "Usuario registrado correctamente",
              userStored,
              status: "Sucess",
            });
        }).catch((error) => {
            return res
            .status(500)
            .send({
              status: "Error",
              message: "Error al guardar el usuario",
            });
        });
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "error",
        message: "Error en la consulta",
      });
    });
};

// Exportar acciones
module.exports = {
  pruebaUser,
  register,
};
