//no tocar
const excelToJson = require("convert-excel-to-json");
var moment = require("moment");
const fs = require("fs");
var xl = require("excel4node");
var wb = new xl.Workbook();
var ws = wb.addWorksheet("Sheet 1");
const GeneralServices = require("./services/BRService");
//

//databases declaration
const AR_DB1 = fs.readFileSync("../MDT BD ARGENTINA/COV Argentina DB.xlsm");
const AR_DB2 = fs.readFileSync("../MDT BD ARGENTINA/MDT Argentina DB.xlsm");
const AR_DB3 = fs.readFileSync("../MDT BD ARGENTINA/OTROS Argentina DB.xlsm");
const BO_DB = fs.readFileSync("../MDT BD BOLIVIA/MDT BD BOLIVIA.xlsm");
const BR_COV = fs.readFileSync(
  "../MDT BD BRAZIL/Piloto Oficial_COV_2020.05.22.xlsm"
);
const BR_MDT = fs.readFileSync(
  "../MDT BD BRAZIL/Piloto Oficial_MDT_2020.06.08.xlsm"
);
const CO_DB = fs.readFileSync("../MDT BD COLOMBIA/MDT BD COLOMBIA.xlsm");
const CR_DB = fs.readFileSync("../MDT BD COSTA RICA/MDT BD COSTA RICA.xlsm");
const EC_DB = fs.readFileSync("../MDT BD ECUADOR/MDT BD ECUADOR.xlsm");
const SV_DB = fs.readFileSync("../MDT BD EL SALVADOR/MDT BD EL SALVADOR.xlsm");
const GT_DB = fs.readFileSync("../MDT BD GUATEMALA/MDT BD GUATEMALA.xlsm");
const MX_DB = fs.readFileSync("../MDT BD MEXICO/MDT BD MEXICO.xlsm");
const PE_DB = fs.readFileSync("../MDT BD PERU/MDT BD PERU.xlsm");
const UY_DB = fs.readFileSync("../MDT BD URUGUAY/MDT BD URUGUAY.xlsm");
const VE_DB = fs.readFileSync("../MDT BD VENEZUELA/MDT BD VENEZUELA.xlsm");

//

//todo NI,HN

const DB_LIST = [
  AR_DB1,
  AR_DB2,
  AR_DB3,
  BO_DB,
  CO_DB,
  CR_DB,
  EC_DB,
  SV_DB,
  GT_DB,
  MX_DB,
  PE_DB,
  VE_DB,
];
const BR_LIST = [BR_COV, BR_MDT];
const countries = [
  "AR",
  "AR",
  "AR",
  "BO",
  "CO",
  "CR",
  "EC",
  "SV",
  "GT",
  "MX",
  "PE",
  "VE",
];
const countries_aux = ["BR", "BR"];
const UY_LIST = [UY_DB];
const countries_aux2 = ["UY"];

//possible parameters
const cfns = [
  "CB10012",
  "CB1351",
  "CB20012",
  "CB2980POLY",
  "CB2993",
  "CB2994",
  "CB2995",
  "CB4613",
  "CB4616",
  "CB4617",
  "CB4618",
  "CB4619",
  "CB4620",
  "CB4622",
  "CB4623",
  "CB4624",
  "CB4626",
  "CB4627",
  "CB4628",
  "CB4629",
  "CB4630",
  "CB4631",
  "CB4632",
  "CB4633",
  "CB4634",
  "CB4715R1",
  "CB4716R1",
  "CB541",
  "CB57421",
  "CB58629",
  "CB58633",
  "CB58733",
  "CB66112",
  "CB66114",
  "CB66116",
  "CB66118",
  "CB66120",
  "CB66122",
  "CB66124",
  "CB66128",
  "CB66130",
  "CB66132",
  "CB66134",
  "CB66136",
  "CB66236",
  "CB66240",
  "CB67312",
  "CB67314",
  "CB67316",
  "CB67318",
  "CB67320",
  "CB67512",
  "CB67514",
  "CB67516",
  "CB67518",
  "CB67520",
  "CB67522",
  "CB67524",
  "CB67528",
  "CB67530",
  "CB67532",
  "CB67534",
  "CB67536",
  "CB67636",
  "CB68112",
  "CB68114",
  "CB68116",
  "CB68118",
  "CB68120",
  "CB68124",
  "CB68128",
  "CB68132",
  "CB68136",
  "CB68138",
  "CB69320",
  "CB69324",
  "CB69328",
  "CB69331",
  "CB71420",
  "CB71422",
  "CB71424",
  "CB72122",
  "CB72124",
  "CB72224",
  "CB75318",
  "CB75320",
  "CB76122",
  "CB77006",
  "CB77008",
  "CB77010",
  "CB77012",
  "CB77014",
  "CB77016",
  "CB77106",
  "CB77108",
  "CB77110",
  "CB77114",
  "CB77116",
  "CB77418",
  "CB77420",
  "CB77422",
  "CB77518",
  "CB77520",
  "CB77522",
  "CB77524",
  "CB77618",
  "CB77620",
  "CB77622",
  "CB77720",
  "CB77722",
  "CB78222",
  "CB78322",
  "CB78422",
  "CB80120",
  "CB811",
  "CB81120",
  "CB81122",
  "CB841",
  "CB87022",
  "CB87222",
  "CB91228",
  "CB91228C",
  "CB91236C",
  "CB91240",
  "CB91240C",
  "CB91246",
  "CB91246C",
  "CB91251C",
  "CB91263",
  "CB91263C",
  "CB91265",
  "CB91265C",
  "CB91329",
  "CB91329C",
  "CB91429",
  "CB91429C",
  "CB91437C",
  "CB93438C",
  "CB96345-023",
  "CB96345-025",
  "CB96345-027",
  "CB96345-029",
  "CB96535-015",
  "CB96535-017",
  "CB96535-019",
  "CB96535-021",
  "CB96540-023",
  "CB96570-015",
  "CB96570-017",
  "CB96570-019",
  "CB96570-021",
  "CB96605-015",
  "CB96605-017",
  "CB96605-019",
  "CB96605-021",
  "CB96605-023",
  "CB96670-015",
  "CB96670-017",
  "CB96670-019",
  "CB96670-021",
  "CB96825-008",
  "CB96825-010",
  "CB96825-012",
  "CB96825-014",
  "CB96835-008",
  "CB96835-010",
  "CB96835-012",
  "CB96835-014",
  "CBAP40",
  "CBMVR800",
];
const expirationDateReferenceStart = "2023-05-01T05:00:16.000Z";
const expirationDateReferenceEnd = "2024-04-30T05:00:16.000Z";

const filterByCriteria = (database, criteria) => {
  let databaseAux = [];
  switch (criteria) {
    case "byCFN":
      for (let index = 0; index < cfns.length; index++) {
        const filteredDBPartial = database.filter((el) => {
          return el.CFN === cfns[index];
        });
        databaseAux = [...databaseAux, ...filteredDBPartial];
      }

      return databaseAux;

    case "byCFNSuffix":
      for (let index = 0; index < cfns.length; index++) {
        const filteredDBPartial = database.filter((el) => {
          return cfns[index].includes(el.CFN);
        });
        databaseAux = [...databaseAux, ...filteredDBPartial];
      }
      return databaseAux;
    case "byExpirationDate":
      const filteredDBPartial = database.filter((el) => {
        return moment(el["EXPIRATION DATE"]).isValid()
          ? moment(el["EXPIRATION DATE"]).isBetween(
              expirationDateReferenceStart,
              expirationDateReferenceEnd,
              undefined,
              "[]"
            )
          : "INVALID";
      });
      databaseAux = [...databaseAux, ...filteredDBPartial];
      return databaseAux;

    default:
      break;
  }
};
const headingColumnNames = [
  "CFN",
  "TREATED CFN",
  "CFN DESCRIPTION",
  "OU",
  "REGISTRATION NUMBER",
  "STATUS",
  "REGISTRATION NAME",
  "LICENSE HOLDER",
  "APPROVAL DATE",
  "EXPIRATION DATE",
  "COUNTRY",
];
let DB_FINAL = [];
let DB_FINAL_BR = [];
let DB_FINAL_UY = [];
//no tocar BR import DB
for (let index = 0; index < BR_LIST.length; index++) {
  let result_aux = excelToJson({
    source: BR_LIST[index],
    sheets: ["Banco de Dados"],
    columnToKey: {
      D: "Código",
      E: "Código Tratado",
      F: "BU",
      G: "Registro ANVISA",
      I: "Data de Aprovação Inicial",
      J: "Data de Vencimento do Registro",
      K: "Nome do Registro",
      L: "Descrição do Código",
      M: "Status do Registro",
      AK: "Detentor do Registro",
    },
    header: {
      rows: 1,
    },
  });
  result_aux = result_aux["Banco de Dados"].map((el) => {
    return {
      ...el,
      COUNTRY: countries_aux[index],
    };
  });
  DB_FINAL_BR = [...DB_FINAL_BR, ...result_aux];
}
//no tocar UY import DB
for (let index = 0; index < countries_aux2.length; index++) {
  let result_uy = excelToJson({
    source: UY_LIST[index],
    sheets: ["ACTIVE CODES"],
    columnToKey: {
      /* A: 'COUNT', */
      B: "CFN",
      C: "TREATED CFN",
      D: "OU",
      E: "REGISTRATION NUMBER",
      F: "APPROVAL DATE",
      G: "EXPIRATION DATE",
      H: "STATUS",
      I: "REGISTRATION NAME",
      J: "LICENSE HOLDER",
      //K: "",
      /*  L: 'FID',
            M: 'MANUFACTURING SITE',
            N: 'MANUFACTURING COUNTRY',
            O: 'RISK CLASSIFICATION',
            P: 'COMMERCIAL PRESENTATION',
            Q: 'SHELF LIFE',
            R: 'LEGACY',
            S: 'COMMENTS',
            T: 'IMPORTADOR',
            U: 'ACONDICIONADOR',
            V: 'CONDICIONES DE ALMACENAMIENTO',
            W: 'EXPEDIENTE',
            X: 'NÚMERO RESOLUCIÓN',
            Y: 'MARCA',
            Z: 'PRESENTE EN REGISTRO' */
    },
    header: {
      rows: 1,
    },
  });
  result_uy = result_uy["ACTIVE CODES"].map((el) => {
    return {
      ...el,
      COUNTRY: countries_aux2[index],
      "CFN DESCRIPTION": "NA",
    };
  });
  DB_FINAL_UY = [...DB_FINAL_UY, ...result_uy];
}
//no tocar
for (let index = 0; index < countries.length; index++) {
  let result = excelToJson({
    source: DB_LIST[index],
    sheets: ["ACTIVE CODES"],
    columnToKey: {
      /* A: 'COUNT', */
      B: "CFN",
      C: "TREATED CFN",
      D: "CFN DESCRIPTION",
      E: "OU",
      F: "REGISTRATION NUMBER",
      G: "APPROVAL DATE",
      H: "EXPIRATION DATE",
      I: "STATUS",
      J: "REGISTRATION NAME",
      K: "LICENSE HOLDER",
      /*  L: 'FID',
            M: 'MANUFACTURING SITE',
            N: 'MANUFACTURING COUNTRY',
            O: 'RISK CLASSIFICATION',
            P: 'COMMERCIAL PRESENTATION',
            Q: 'SHELF LIFE',
            R: 'LEGACY',
            S: 'COMMENTS',
            T: 'IMPORTADOR',
            U: 'ACONDICIONADOR',
            V: 'CONDICIONES DE ALMACENAMIENTO',
            W: 'EXPEDIENTE',
            X: 'NÚMERO RESOLUCIÓN',
            Y: 'MARCA',
            Z: 'PRESENTE EN REGISTRO' */
    },
    header: {
      rows: 1,
    },
  });
  result = result["ACTIVE CODES"].map((el) => {
    return {
      ...el,
      COUNTRY: countries[index],
    };
  });
  DB_FINAL = [...DB_FINAL, ...result];
}

//here change condition to do tracker
//
//byExpirationDate
DB_FINAL = [...DB_FINAL, ...DB_FINAL_UY];
let db_filtered = filterByCriteria(DB_FINAL, "byCFN");
let db_filtered_br = GeneralServices.processBrazil(DB_FINAL_BR, "byCFN", cfns);
db_filtered = db_filtered.map((el) => {
  try {
    return {
      CFN: el["CFN"] ? el["CFN"].toString() : "NULL",
      "TREATED CFN": el["TREATED CFN"] ? el["TREATED CFN"].toString() : "NULL",
      "CFN DESCRIPTION": el["CFN DESCRIPTION"]
        ? el["CFN DESCRIPTION"].toString()
        : "NULL",
      OU: el["OU"] ? el["OU"].toString() : "NULL",
      "REGISTRATION NUMBER": el["REGISTRATION NUMBER"]
        ? el["REGISTRATION NUMBER"].toString()
        : "NULL",
      STATUS: el["STATUS"] ? el["STATUS"].toString() : "NULL",
      "REGISTRATION NAME": el["REGISTRATION NAME"]
        ? el["REGISTRATION NAME"].toString()
        : "NULL",
      "LICENSE HOLDER": el["LICENSE HOLDER"]
        ? el["LICENSE HOLDER"].toString()
        : "NULL",
      "APPROVAL DATE": el["APPROVAL DATE"]
        ? moment(new Date(el["APPROVAL DATE"])).format("DD-MMM-YYYY").toString()
        : "NULL",
      "EXPIRATION DATE": el["EXPIRATION DATE"]
        ? moment(new Date(el["EXPIRATION DATE"]))
            .format("DD-MMM-YYYY")
            .toString()
        : "NULL",
      COUNTRY: el["COUNTRY"] ? el["COUNTRY"].toString() : "NULL",
    };
  } catch (error) {
    console.log("error normal");
    console.log(error);
  }
});
let db_final = [...db_filtered, ...db_filtered_br];
//no tocar
/* var dbString = JSON.stringify(db_final);
fs.writeFile("database.json", dbString, (err) => {
  if (err) {
    console.error(err);
  }
}); */
//Write Column Title in Excel file
let headingColumnIndex = 1;
headingColumnNames.forEach((heading) => {
  ws.cell(1, headingColumnIndex++).string(heading);
});
let errorArray = [];
//Write Data in Excel file
let rowIndex = 2;
db_final.forEach((record, index) => {
  try {
    let columnIndex = 1;
    Object.keys(record).forEach((columnName) => {
      ws.cell(rowIndex, columnIndex++).string(record[columnName]);
    });
    rowIndex++;
  } catch (error) {
    console.log(error);
    errorArray.push({ error: error, index: index, record: record });
  }
});
wb.write("tracker.xlsx");
console.log(JSON.stringify(errorArray));
//kpis measurement and RAD strategies and team organization
//presentacion para que las persona se presenten
//topics
//data engieenering
//dynamodb
//ocr automations
//artificial intelligence project
//time savings
