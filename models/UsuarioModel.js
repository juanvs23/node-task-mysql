const { Secuelize, DataTypes } = require("sequelize");
const slug = require("slug");
const connect = require("../configs/connect");
const { default: ShortUniqueId } = require("short-unique-id");
const Proyectos = require("../models/ProyectosModel");
const bcrypt = require("bcrypt");

const Usuarios = connect.define(
  "usuarios",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: DataTypes.STRING(100),
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: {
        args: true,
        msg: "Email address already in use!",
      },
    },
    avatar: {
      type: DataTypes.STRING,
    },
    userpass: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate(usuario) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(usuario.userpass, salt);
        usuario.userpass = hash;
      },
    },
  }
);
Usuarios.prototype.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.userpass);
};
Usuarios.hasMany(Proyectos, {
  foreignKey: {
    name: "owner",
  },
  as: "usuarios",
  targetKey: "id",
});

module.exports = Usuarios;
