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

const login = (req, res) => {

  // Recoger parametros del body
  let params = req.body;

  if(!params.email || !params.password){
    return res.status(400).send({
      status: "error", 
      message: "Faltan datos por enviar",
    })
  }

  // Buscar en la base de bbdd si existe
  User.findOne({email: params.email})
  //Restringir visuzliación de datos
  //.select({"password": 0})
  .then((user) => {
    if(!user){
      return res.status(404).send({
        status: "error",
        message: "No existe el usuario"
      });
    }

    // Comprobar su contraseña
    const pwd = bcrypt.compareSync(params.password, user.password);
    if(!pwd){
      return res.status(400).send({
        status: "error",
        message: "No te has identificado correctamente"
      })
    }

    // Conseguir Token
    const token = false;

    // Datos user

    return res.status(200).send({
      status: "succes",
      message: "Te has identificado correctamente",
      user: {
        id: user.id,
        name: user.name,
        nick: user.nick
      },
      token
    })
  }).catch((error) =>{
    return res.status(404).send({
      status: "error",
      message: "No existe el usuario",
      error
    });
  });

};

// Exportar acciones
module.exports = {
  pruebaUser,
  register,
  login
};
