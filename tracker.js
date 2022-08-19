"use strict";
//no tocar
const excelToJson = require("convert-excel-to-json");
//no tocar
var moment = require("moment");
//no tocar
const fs = require("fs");

//databases declaration
const CO_DB = fs.readFileSync("../MDT Colombia DB.xlsm");
const CR_DB = fs.readFileSync("../MDT Costa Rica DB.xlsm");
const EC_DB = fs.readFileSync("../MDT Ecuador DB.xlsm");
const SV_DB = fs.readFileSync("../MDT El Salvador DB.xlsm");
const GT_DB = fs.readFileSync("../MDT Guatemala DB.xlsm");
const MX_DB = fs.readFileSync("../MDT Mexico DB.xlsm");


const DB_LIST = [CO_DB, CR_DB, EC_DB, SV_DB, GT_DB, MX_DB];
const countries = ["CO", "CR", "EC", "SV","GT","MX"];

//possible parameters
const cfns = [
  "MMT-7810",
  "MMT-7811",
  "MMT-7910",
  "MMT-7911",
  "MMT-7820",
  "MMT-7821",  
  "MMT-7512",
  "MMT-7736",
  "MMT-7715",
];
const expirationDateReferenceStart = "2023-05-01T14:48:00.000Z";
const expirationDateReferenceEnd = "2024-04-30T14:48:00.000Z";
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
            return  cfns[index].includes(el.CFN);
          });
          databaseAux = [...databaseAux, ...filteredDBPartial];
        }
        return databaseAux;
        case "byExpirationDate"


    default:
      break;
  }
};

let DB_FINAL = [];

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
      "APPROVAL DATE": moment(new Date(el["APPROVAL DATE"])).format(
        "DD-MMM-YYYY"
      ),
      "EXPIRATION DATE": moment(new Date(el["EXPIRATION DATE"])).format(
        "DD-MMM-YYYY"
      ),
    };
  });
  DB_FINAL = [...DB_FINAL, ...result];
}

let db_filtered = filterByCriteria(DB_FINAL, "byCFN");

//no tocar
var dbString = JSON.stringify(db_filtered);
fs.writeFile("database.json", dbString, (err) => {
  if (err) {
    console.error(err);
  }
});
