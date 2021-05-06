const proyectos = require("../models/ProyectosModel");
const Tareas = require("../models/tareasModel");
// const slug = require('slug')
const day = new Date();
const today = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;

exports.ProyectoHome = async (req, res) => {
  const { username } = res.locals.user;
  const allProyectos = await proyectos.findAll({
    where: {
      status: 1,
    },
  });
  const allTask = await Tareas.findAll();

  res.render("index", {
    title: "Sistema de seguimimiento de tareas",
    titleBar: "Escritorio principal",
    allProyectos,
    allTask,
    nombre: username,
  });
};

exports.ProyectoFormulario = async (req, res) => {
  const { username } = res.locals.user;
  const allProyectos = await proyectos.findAll({
    where: {
      status: 1,
    },
  });

  res.render("pages/nuevo-proyecto", {
    title: "Nuevo proyecto",
    today,
    titleBar: "Añadir proyecto",
    allProyectos,
    nombre: username,
  });
};
exports.ProyectoDetails = async (req, res) => {
  const { username } = res.locals.user;
  const allProyectos = await proyectos.findAll({
    where: {
      status: 1,
    },
  });
  const proyecto = await proyectos.findOne({
    where: {
      url: req.params.url,
    },
  });
  const alltareasbyProyecto = await Tareas.findAll({
    where: {
      proyectoId: proyecto.id,
    },
  });
  console.log(proyecto.id);
  if (!proyecto) {
    res.render("pages/error404", {
      title: `Error 404`,
      nombre: username,
      titleBar: `El proyecto no existe`,
      allProyectos,
    });
  } else {
    res.render("pages/tareas", {
      title: `Editar tareas en ${proyecto.nombre}`,
      today,
      titleBar: `Tareas en ${proyecto.nombre}`,
      allProyectos,
      proyecto,
      nombre: username,
      alltareasbyProyecto,
    });
  }
};
exports.NuevoProyecto = async (req, res) => {
  console.log(req.body);
  const busca = await proyectos.findAll({
    where: {
      status: 1,
      nombre: req.body.name,
    },
  });
  if (busca.length > 0) {
    res.send("existe");
  } else {
    await proyectos
      .create({
        nombre: req.body.name,
        descripcion: req.body.descripcion,
        startDate: req.body.startDate,
        endDate: req.body.startDate,
        status: 1,
      })
      .then(() => console.log("exito proyecto guardado"))
      .catch((error) => {
        console.log(error);
      });
    console.log("No exite");
    res.send("no existe");
  }
};
exports.EditarProyecto = async (req, res) => {
  const { username } = res.locals.user;
  const allProyectos = await proyectos.findAll({
    where: {
      status: 1,
    },
  });
  const proyecto = await proyectos.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!proyecto) {
    // proyecto no encontrado

    res.render("pages/error404", {
      title: `Error 404`,
      nombre: username,
      titleBar: `El proyecto no existe`,
      allProyectos,
    });
  } else {
    res.render("pages/nuevo-proyecto", {
      title: "Nuevo proyecto",
      today,
      titleBar: "Añadir proyecto",
      allProyectos,
      proyecto,
      nombre: username,
    });
  }
};
exports.UpdateProyecto = async (req, res) => {
  const allProyectos = await proyectos.findAll({
    where: {
      status: 1,
    },
  });
  const proyecto = await proyectos.findOne({
    where: {
      id: req.params.id,
    },
  });
  console.log(proyecto);

  if (
    req.body.name == "" ||
    req.body.startDate == "" ||
    req.body.enddate == "" ||
    req.body.enddate == today
  ) {
    const errorArray = [];
    if (req.body.name == "") {
      errorArray.push({
        texto: "Nombre de proyecto Vacio",
      });
    }
    if (req.body.startDate == "") {
      errorArray.push({
        texto: "Fecha de inicio del proyecto Vacio",
      });
    }
    if (req.body.enddate == "") {
      errorArray.push({
        texto: "Fecha de fin del proyecto Vacio",
      });
    }
    res.render("pages/nuevo-proyecto", {
      title: "Nuevo proyecto",
      today,
      titleBar: "Añadir proyecto",
      errors: errorArray,
      allProyectos,
    });
  } else {
    await proyecto
      .update({
        nombre: req.body.name,
        descripcion: req.body.descripcion,
        startDate: req.body.startDate,
        endDate: req.body.startDate,
      })
      .then(() => console.log("proyecto actualizado con exito"))
      .catch((error) => {
        console.log(error);
      });
    res.render("pages/nuevo-proyecto", {
      title: "Uptask",
      titleBar: "Inicio",
      successUpdate: [
        {
          texto: "¡El proyecto a sido guardado con exito!",
        },
      ],
      allProyectos,
    });
  }
};
// borrar proyectos
exports.BorrarProyecto = async (req, res) => {
  const borrarProyecto = await proyectos.findOne({
    where: {
      id: req.params.id,
    },
  });
  console.log(borrarProyecto);
  await borrarProyecto.update({
    status: 0,
  });
  res.send("Archivo borrado");
};

// errores de pagina no encontrada
exports.Error404 = async (req, res, next) => {
  const { username } = res.locals.user;
  console.log(username);
  const allProyectos = await proyectos.findAll();
  res.status(404);
  res.render("pages/error404", {
    title: `Error 404`,
    nombre: username,
    titleBar: `Pagina desconocida`,
    allProyectos,
  });
};
