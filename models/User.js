const { Schema, model } = require("mongoose");

const UserSchema = Schema({

    name: {
        type: String,
        require: true
    },
    surname: String,
    nick: {
        type: String,
        require: true
    },
    email: {
        require: true,
        type: String
    },
    password:{
        require: true,
        type: String
    },
    role: {
        type: String,
        default: "role_user"
    },
    image: {
        type: String,
        default: "default.png"
    },
    created_at: {
        type: Date,
        default: Date.now
    }

});

//Nombre modelo - Fomarto modelo - Nombre de la colleción
module.exports = model("User", UserSchema, "users")
