// standard dec
require('module-alias/register');
let connPool = require('./routes/connectors/oraclePool');  // connPool

const express = require("express");
const app = express();
let bodyParser = require("body-parser");
// custom dec
let fileLogger = require("@log/fileLogger");
let alertSys = require("@ale/alertsBasic");
let schedular = require("@ale/schedular");
let security = require("@ale/security/security");
// services dec
const token = require("@val/provideToken");
let userPriv = require("@ale/UserPriv/UserPriv");
let userRole = require("@ale/UserRole/UserRole");

// common
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('assets'));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});



app.use(schedular);
// Authorization
// loggers
//app.use(fileLogger);
// performance
require("@lib/prod")(app);
// services
app.use("/providetoken",token); // first service
app.use("/alertSys",alertSys); // second service
app.use("/security", security); // third service
app.use("/SecPriv", userPriv); // fourth service
app.use("/userRole" , userRole);


const port = process.env.ALEPORT;
app.listen(port, () => console.log(`Listening on Port `  + process.env.ALEPORT));
