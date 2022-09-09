"use strict";
//no tocar
const excelToJson = require("convert-excel-to-json");
//no tocar
var moment = require("moment");
//no tocar
const fs = require("fs");
//Brazil, Sao Paulo
//Central Latin America
//Southern Latin America
//Northern Latin America
//databases declaration
const QMSDocs = fs.readFileSync("./QMSH_P _ 8-26-2022 ");
let result = excelToJson({
    source: QMSDocs,
    sheets: ["Sheet0"],
    columnToKey: {
      A: 'Number', 
      B: "QMS Process|SubProcess (Document Information)",
      C: "Description",
      D: "Governance Level (Document Information)",
      E: "Category (Document Information)",
      F:"Rev",
      G: "Document Owner (Document Information)",
      H: "Process Owner (Document Information)",
      I: "Applicable QMS Entities (Document Information)",
      J: "Type",
      K: "Lifecycle Phase",
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
  const filterDocs = (documentsToFilter) =>{
    console.log(documentsToFilter)
  }
  //here change condition to do tracker
let docs_filtered = filterDocs(result);