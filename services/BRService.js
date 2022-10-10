var moment = require("moment");
const processBRFormat = (database) => {
  let db_processed = database.map((el) => {
    try {
      return {
        CFN: el["Código"]?el["Código"].toString():"INVALID",
        "TREATED CFN": el["Código Tratado"]?el["Código Tratado"].toString():"INVALID",
        "CFN DESCRIPTION": el["Descrição do Código"]
          ? el["Descrição do Código"].toString()
          : "INVALID".toString(),
        OU: el["BU"]?el["BU"].toString():"INVALID",
        "REGISTRATION NUMBER": el["Registro ANVISA"]? el["Registro ANVISA"].toString():"INVALID",
        STATUS: el["Status do Registro"]?el["Status do Registro"].toString():"INVALID",
        "REGISTRATION NAME": el["Nome do Registro"]?el["Nome do Registro"].toString():"INVALID",
        "LICENSE HOLDER": el["Detentor do Registro"]
          ? el["Detentor do Registro"].toString()
          : "INVALID",
        "APPROVAL DATE": el["Data de Aprovação Inicial"]? moment(new Date(el["Data de Aprovação Inicial"]))
          .format("DD-MMM-YYYY")
          .toString():"INVALID",
        "EXPIRATION DATE": el["Data de Vencimento do Registro"]? moment(
          new Date(el["Data de Vencimento do Registro"])
        )
          .format("DD-MMM-YYYY")
          .toString():"INVALID",
        COUNTRY: el["COUNTRY"].toString(),
      };
    } catch (error) {
      console.log("error BR");
      console.log(error);
    }
  });
  return db_processed;
};
function processBrazil(
  database,
  criteria,
  cfns,
  expirationDateReferenceStart,
  expirationDateReferenceEnd
) {
  try {
    let databaseAux = [];
    switch (criteria) {
      case "byCFN":
        for (let index = 0; index < cfns.length; index++) {
          const filteredDBPartial = database.filter((el) => {
            let cfnTemp ="";
            if(!el["Código"]){
              cfnTemp ="INVALID"
            }else{
              cfnTemp = el["Código"].toString().trim();
            }
            return cfnTemp === cfns[index].toString().trim();
          });
          databaseAux = [...databaseAux, ...filteredDBPartial];
        }
        databaseAux = processBRFormat(databaseAux);
        return databaseAux;
      case "byExpirationDate":
        const filteredDBPartial = database.filter((el) => {
          return moment(
            new Date(el["Data de Vencimento do Registro"])
          ).isValid()
            ? moment(new Date(el["Data de Vencimento do Registro"])).isBetween(
                expirationDateReferenceStart,
                expirationDateReferenceEnd,
                undefined,
                "[]"
              )
            : "INVALID";
        });
        databaseAux = [...databaseAux, ...filteredDBPartial];
        databaseAux = processBRFormat(databaseAux);
        return databaseAux;

      default:
        break;
    }
  } catch (error) {
    return { operation: "FAILED", error: error.message };
  }
}
module.exports.processBrazil = processBrazil;
