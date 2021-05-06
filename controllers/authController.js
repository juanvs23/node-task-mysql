const passport = require("passport");

exports.authenticateUsuario = passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
  failureFlash: true,
  badRequestMessage: "Ambos Campos son Obligatorios",
});
exports.IsAuthed = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect("/");
  }
};
exports.closeSession = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
