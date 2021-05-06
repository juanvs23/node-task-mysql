const express = require("express");
const ProyectosController = require("../controllers/ProyectosController");
const TareasController = require("../controllers/TareasController");
const UsuariosController = require("../controllers/UsuariosController");
const PagesController = require("../controllers/PagesController");
const AuthController = require("../controllers/authController");

const router = express.Router();

const { body } = require("express-validator");

module.exports = function () {
  // system
  router.get(
    "/dashboard/",
    AuthController.IsAuthed,
    ProyectosController.ProyectoHome
  );
  router.get(
    "/dashboard/nuevo-proyecto",
    AuthController.IsAuthed,
    ProyectosController.ProyectoFormulario
  );
  router.post(
    "/dashboard/proyecto-creado",
    body("name").trim().escape(),
    ProyectosController.NuevoProyecto
  );
  router.get(
    "/dashboard/editar-proyecto/:id",
    body("name").trim().escape(),
    ProyectosController.EditarProyecto
  );
  router.post(
    "/dashboard/proyecto-editado/:id",
    body("name").trim().escape(),
    ProyectosController.UpdateProyecto
  );
  router.get(
    "/dashboard/proyectos/:url",
    AuthController.IsAuthed,
    ProyectosController.ProyectoDetails
  );
  router.post(
    "/dashboard/borrar-proyecto/:id",
    ProyectosController.BorrarProyecto
  );
  router.post("/dashboard/nueva-tarea/:url", TareasController.NuevaTarea);
  router.delete("/dashboard/delete-task/:id", TareasController.BorrarTarea);
  router.post("/dashboard/edit-task/:id", TareasController.EditTask);
  // auths
  router.get("/register", UsuariosController.createAccountPage);
  router.get("/login", UsuariosController.loginPage);
  router.get("/pass-recover", UsuariosController.recoverPage);
  router.post("/new-account", UsuariosController.newUser);
  router.post("/login", AuthController.authenticateUsuario);
  router.get("/close-session", AuthController.closeSession);
  // page
  router.get("/", PagesController.HomePages);
  // pages 404
  router.get("/dashboard/*", ProyectosController.Error404);
  router.get("*", PagesController.Page404);

  return router;
};
