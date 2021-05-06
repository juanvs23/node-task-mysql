exports.varDump = (objeto) => JSON.stringify(objeto, null, 2);

exports.timeDate = () => {
  const date = new Date();
  const day = date.getDate();
  const months = new Array(
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  );
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return {
    day,
    month,
    year,
  };
};
