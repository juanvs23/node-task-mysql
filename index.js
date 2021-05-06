const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routers/index");
const path = require("path");
const port = 3200;
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const connect = require("./configs/connect");
const passport = require("./configs/passport");
const helpers = require("./helpers");
const router404 = require("./routers/index");
// invoca a express
const app = express();
// habilitar body parser
app.use(bodyParser.urlencoded({ extended: true }));

// Habilitar Pug
app.set("view engine", "pug");
// carpeta public
app.use("/assets", express.static(__dirname + "/public"));

// carga de modelos
require("./models/ProyectosModel");
require("./models/tareasModel");
require("./models/UsuarioModel");

// cargar conexion
connect.sync({ force: true }).then(() => console.log("conectado"));
// app.use(express.static('public'));
// Añadir la carpeta de las vistas
app.set("views", path.join(__dirname, "./views"));
// CookieParser
app.use(cookieParser());

// session
app.use(
  session({
    secret: "Sin intrusos",
    resave: false,
    saveUninitialized: true,
  })
);
// flash
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// agregar varDump
app.use((req, res, next) => {
  console.log(req.user);
  res.locals.vardump = helpers.varDump;
  res.locals.timeDate = helpers.timeDate;
  res.locals.mensajes = req.flash();
  res.locals.user = { ...req.user } || null;
  next();
});

// habilita rutas
app.use("/", routes());

app.listen(port, () =>
  console.log(`Servidor activo por el puerto ${port}`, __dirname)
);
