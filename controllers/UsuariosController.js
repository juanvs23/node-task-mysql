const Usuarios = require("../models/UsuarioModel");

exports.createAccountPage = async (req, res) => {
  res.render("pages/account", {
    title: "Crear nueva cuenta",
    recover: false,
    register: true,
    login: false,
  });
};
exports.loginPage = async (req, res) => {
  const { error_email, error_pass, error } = res.locals.mensajes;

  if (error_email) {
    res.render("pages/account", {
      title: "Ingresa a tu cuenta",
      recover: false,
      register: false,
      login: true,
      error: error_email,
    });
  } else if (error_pass) {
    res.render("pages/account", {
      title: "Ingresa a tu cuenta",
      recover: false,
      register: false,
      login: true,
      error: error_pass,
    });
  } else if (error) {
    res.render("pages/account", {
      title: "Ingresa a tu cuenta",
      recover: false,
      register: false,
      login: true,
      error: error,
    });
  } else {
    res.render("pages/account", {
      title: "Ingresa a tu cuenta",
      recover: false,
      register: false,
      login: true,
    });
  }
};
exports.recoverPage = async (req, res) => {
  res.render("pages/account", {
    title: "Ingresa a tu cuenta",
    recover: true,
    register: false,
    login: false,
  });
};
exports.newUser = async (req, res) => {
  const { username, email, avatar, userpass, role } = req.body;
  const status = 1;
  try {
    Usuarios.create({
      username,
      email,
      avatar,
      userpass,
      role,
      status: status,
    })
      .then((result) => {
        {
          res.send("exito");
        }
      })
      .catch((error) => {
        console.log(error);
        res.send("email existe");
      });
  } catch (error) {
    console.log(error);
  }
};
