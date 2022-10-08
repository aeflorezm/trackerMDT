var moment = require("moment");
const processBRFormat = (database) =>{
  let db_processed = database.map((el) => {
    try {
      return {
        CFN: el["Código"].toString(),
        "TREATED CFN": el["Código Tratado"].toString(),
        "CFN DESCRIPTION": el["Descrição do Código"] ? el["Descrição do Código"].toString():"NA".toString(),
        OU: el["BU"].toString(),
        "REGISTRATION NUMBER": el["Registro ANVISA"].toString(),
        STATUS: el["Status do Registro"].toString(),
        "REGISTRATION NAME": el["Nome do Registro"].toString(),
        "LICENSE HOLDER":  el["Detentor do Registro"].toString(),
        "APPROVAL DATE": moment(new Date(el["Data de Aprovação Inicial"]))
          .format("DD-MMM-YYYY")
          .toString(),
        "EXPIRATION DATE": moment(new Date(el["Data de Vencimento do Registro"]))
          .format("DD-MMM-YYYY")
          .toString(),
          COUNTRY: el["COUNTRY"].toString(),
      };
    } catch (error) {
      console.log("error BR");
      console.log(error)
    }
  });
  return db_processed;
}
function processBrazil (database,criteria, cfns) {
  try {
  let databaseAux = [];
  switch (criteria) {
    case "byCFN":
      for (let index = 0; index < cfns.length; index++) {
        const filteredDBPartial = database.filter((el) => {
          return el["Código"] === cfns[index];
        });
        databaseAux = [...databaseAux, ...filteredDBPartial];
      }
      databaseAux = processBRFormat(databaseAux);
      console.log(databaseAux)
      return databaseAux;

    default:
      break;
  }
    }
     catch (error) {
    return { operation: "FAILED", error: error.message };
  }
};
module.exports.processBrazil = processBrazil;
