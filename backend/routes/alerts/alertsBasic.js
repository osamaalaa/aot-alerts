require("module-alias/register");

let express = require("express");
let router = express.Router();
let dataexistsvalidator = require("@vals/dataexists");
const statements = require("./sqlStatements");
let bodyconverter = require("@conv/bodyConverter");
let accessRules = require("./AccessRules");
let validatestructure = require("@lib/validatestructure");
let settings = require("@obj/settings");
let request = require('request');
let servicePool = require('@lib/servicePool');
let businessPool = require('@lib/businessPool');
router.use(accessRules);
  
//router.use(validatetoken); // temp until going to PROD ..

// Get Services ..

router.get("/getAllEventDefs", (req, res) => {
  servicePool(
    req,
    res,
    statements.getAllEventDefs.statement,
    []
  );
});

router.get(
  "/getEventActions/:EVENT_ID",
  dataexistsvalidator.checkparamdataexists,
  (req, res) => {
    servicePool(
      req,
      res,
      statements.getEventActions.statement,
      { EVENT_ID: req.params.EVENT_ID }
    );
  }
);

router.get(
  "/getEventConditions/:ACTION_ID",
  dataexistsvalidator.checkparamdataexists,
  (req, res) => {
    servicePool(
      req,
      res,
      statements.getEventConditions.statement,
      { ACTION_ID: req.params.ACTION_ID }
    );
  }
);
router.get(
  "/getEventSchedule/:ACTION_ID",
  dataexistsvalidator.checkparamdataexists,
  (req, res) => {
    servicePool(
      req,
      res,
      statements.getEventSchedule.statement,
      { ACTION_ID: req.params.ACTION_ID }
    );
  }
);


router.get(
  "/getScheduleType/:TYPE_ID",
  dataexistsvalidator.checkparamdataexists,
  (req, res) => {
    servicePool(
      req,
      res,
      statements.getScheduleType.statement,
      { TYPE_ID: req.params.TYPE_ID }
    );
  }
);

router.get(
  "/getAllScheduleTypes",
  (req, res) => {
    servicePool(
      req,
      res,
      statements.getAllScheduleTypes.statement,
      []
    );
  }
);

router.get(
  "/getEventAudit/:EVENT_ID",
  dataexistsvalidator.checkparamdataexists,
  (req, res) => {
    servicePool(
      req,
      res,
      statements.getEventAudit.statement,
      { EVENT_ID: req.params.EVENT_ID }
    );
  }
);

router.get(
  "/getPKColumn/:TABLE_NAME",
  dataexistsvalidator.checkparamdataexists,
  (req, res) => {
    servicePool(
      req,
      res,
      statements.getPKColumn.statement,
      { TABLE_NAME: req.params.TABLE_NAME }
    );
  }
);

router.get(
  "/getActionEmployee/:ACTION_ID",
  dataexistsvalidator.checkparamdataexists,
  (req, res) => {
    servicePool(
      req,
      res,
      statements.getActionEmployee.statement,
      { ACTION_ID: req.params.ACTION_ID }
    );
  }
);

router.get(
  "/getActionExecutions/:ACTION_ID",
  dataexistsvalidator.checkparamdataexists,
  (req, res) => {
    servicePool(
      req,
      res,
      statements.getActionExecutions.statement,
      { ACTION_ID: req.params.ACTION_ID }
    );
  }
);

// Post Services ..

router.post(
  "/insertEventAudit",
  dataexistsvalidator.checkbodydataexists,
  validatestructure.validateEventAuditStructure,
  (req, res) => {
    servicePool(
      req,
      res,
      statements.insertEventAudit.statement,
      req.body
    );
  }
);

router.post(
  "/insertEventDef",
  dataexistsvalidator.checkbodydataexists,
  validatestructure.validateEventDefStructure,
  (req, res) => {
    bodyconverter.bodyconverter(req, res, req.body, statements.insertEventDef.returns).then(convertedbody =>{
      servicePool(
        req,
        res,
        statements.insertEventDef.statement,
        req.body
      );
    });
  }
);

router.post(
  "/insertEventAction",
  dataexistsvalidator.checkbodydataexists,
  validatestructure.validateEventActionStructure,
  (req, res) => {
    bodyconverter.bodyconverter(req, res, req.body, statements.insertEventAction.returns).then(convertedbody =>{
      servicePool(
        req,
        res,
        statements.insertEventAction.statement,
        convertedbody
      );
    });
  }
);

router.post(
  "/insertActionSchedule",
  dataexistsvalidator.checkbodydataexists,
  validatestructure.validateActionScheduleStructure,
  (req, res) => {
    servicePool(
      req,
      res,
      statements.insertActionSchedule.statement,
      req.body
    );
  }
);

router.post(
  "/insertActionCondition",
  dataexistsvalidator.checkbodydataexists,
  validatestructure.validateActionConditionStructure,
  (req, res) => {
    servicePool(
      req,
      res,
      statements.insertActionCondition.statement,
      req.body
    );
  }
);

router.post(
  "/insertScheduleType",
  dataexistsvalidator.checkbodydataexists,
  validatestructure.validateActionScheduleTypeStructure,
  (req, res) => {
    servicePool(
      req,
      res,
      statements.insertScheduleType.statement,
      req.body
    );
  }
);

router.post(
  "/insertActionEmployee",
  dataexistsvalidator.checkbodydataexists,
  validatestructure.validateActionEmployeeStructure,
  (req, res) => {
    servicePool(
      req,
      res,
      statements.insertActionEmployee.statement,
      req.body
    );
  }
);

router.post(
  "/insertActionExecution",
  dataexistsvalidator.checkbodydataexists,
  validatestructure.validateActionExecutionStructure,
  (req, res) => {
    servicePool(
      req,
      res,
      statements.insertActionExecution.statement,
      req.body
    );
  }
);

router.post("/changeEventStatus/:EVENT_ID", (req, res) => {
  servicePool(
    req,
    res,
    dataexistsvalidator.ccomposeupdatestatement(
      "EVENT_DEF",
      req.body,
      "EVENT_ID = " + req.params.EVENT_ID
    ),
    []
  );
});

router.post("/sendSMS", (req, res) => {
  request(settings.sms.url + req.body.TO +
    "&msgtext=" + req.body.MESSAGE, {
    json: true
  }, (err, ress, resultbody) => {
    if (err) {
      res.status(401).json({"error" : err});
    }
  res.status(200).json({"status" : "success", "result" : resultbody});
});
});

router.get(
  "/getAllTables",
  (req, res) => {
    servicePool(
      req,
      res,
      statements.getallTables.statement,
      []
    );
  }
);

router.get(
  "/getTableColumns/:TABLE_NAME",
  // validatestructure.validateTableColumndStructureExecutionStructure,
  (req, res) => {
    servicePool(
      req,
      res,
      statements.getTableColumns.statement,
      {TABLE_NAME: req.params.TABLE_NAME}
    );
  }
);

router.get(
  "/getAllEmployees",
  (req, res) => {
    servicePool(
      req,
      res,
      statements.getallEmployees.statement,
      []
    );
  }
);

// Dashboard ..

router.get(
  "/getexectuionstat",
  (req, res) => {
    servicePool(
      req,
      res,
      statements.getexectuionstat.statement,
      []
    );
  }
);

router.get(
  "/getsuccessfailurestat",
  (req, res) => {
    servicePool(
      req,
      res,
      statements.getsuccessfailurestat.statement,
      []
    );
  }
);

router.get(
  "/getscheduletypestat",
  (req, res) => {
    servicePool(
      req,
      res,
      statements.getscheduletypestat.statement,
      []
    );
  }
);

router.post(
  "/validateConditions",
  (req, res) => {
      let result = dataexistsvalidator.checkconditionvalueexists(req.body);
      servicePool(
        req,
        res,
        result.result,
        []
      );

  }
);

router.get(
  "/getAllEventAudit",
  (req, res) => {
    servicePool(
      req,
      res,
      statements.getAllEventAudit.statement,
      []
    );
  }
);

router.get(
  "/getAllActionResults",
  (req, res) => {
    servicePool(
      req,
      res,
      statements.getAllActionResults.statement,
      []
    );
  }
);

router.get(
  "/getAllScheduleLog",
  (req, res) => {
    servicePool(
      req,
      res,
      statements.getAllScheduleLog.statement,
      []
    );
  }
);

router.get(
  "/geteventSchema",
  (req, res) => {
    servicePool(
      req,
      res,
      statements.geteventSchema.statement,
      []
    );
  }
);

var nodemailer = require('nodemailer');

router.post("/sendEmail",(req, res) => {
  let stat = `SELECT 
  EMAIL_SETTING_ID, 
  SUBSIDIARY_ID, 
  APPLICATION_ID, 
    MAIL_SERVER_HOST,
      MAIL_SERVER_PORT,
      MAIL_SERVER_USERNAME, 
    MAIL_SERVER_PASSWORD,
      SENDER_EMAIL,
      SSL, 
    TLS,
      CREATION_DATE, 
      STATUS, 
    CREATED_BY,
      SETTING_NAME,
      PROTOCOL, 
    AUTHENTICATION_REQUIRED
    SYSTEM_ID,
      TESTED
  FROM AOT_GEN.EMAIL_SETTINGS WHERE DELETED = 0 AND APPLICATION_ID = 2`;
businessPool(req, res, stat,[]
).then(stat=>{
  let EmailFrom = stat.rows[0].SENDER_EMAIL;
  let EmailTo = req.body.TO_EMAIL;
  let EmailSubject = req.body.SUBJECT
var transporter = nodemailer.createTransport({ 
  // secureConnection: false,
  host: stat.rows[0].MAIL_SERVER_HOST,
  port: stat.rows[0].MAIL_SERVER_PORT ,
  // tls: stat.rows[0].TLS,
  ssl: stat.rows[0].SSL,
  tls: {
    rejectUnauthorized: false
  },
  // secure: false,
  auth:{
    user: stat.rows[0].SENDER_EMAIL,                
    pass: stat.rows[0].MAIL_SERVER_PASSWORD                                        
  }
});
var mailOptions = {
  from: stat.rows[0].SENDER_EMAIL,                   
  to: req.body.TO_EMAIL,
  subject: req.body.SUBJECT,
  text: req.body.MESSAGE
};
transporter.sendMail(mailOptions, function(error , info){
  if(error){
    // console.log(error);
    res.status(401).json({
      "status" : 401, 
      error: error.response
    });
  }
  else{
    res.status(200).json({
      "status" : 200, 
      "result" : info.response
    });
   // console.log('Email sent:' , info.response);
    }
  })

        })


});  




router.get("/getEmailsCount",(req, res) => {
  let stat = `SELECT 
  COUNT(EMAIL_TO) EMAILS_TO_COUNT ,
  EMAIL_TO
  
               FROM AOT_GEN.EMAIL_NOTIFICATIONS WHERE DELETED = 0 
               GROUP BY EMAIL_TO`;
    servicePool(
      req,
      res,
      statements.getEmailsCount.statement,
      []
    );
  }
);


router.get("/getServiceCount",(req, res) => {
  let statService = `SELECT 
  COUNT(USER_NAME) USER_NAME_COUNT,
  USER_NAME
FROM AOT_GEN.WEB_SERVICES WHERE DELETED = 0 GROUP BY USER_NAME`;
    servicePool(
      req,
      res,
      statService,
      []
    );
  }
);


router.post("/insertEmailNotification",(req, res) => {

  let stat = `SELECT 
  EMAIL_SETTING_ID, 
  SUBSIDIARY_ID, 
  APPLICATION_ID, 
    MAIL_SERVER_HOST,
      MAIL_SERVER_PORT,
      MAIL_SERVER_USERNAME, 
    MAIL_SERVER_PASSWORD,
      SENDER_EMAIL,
      SSL, 
    TLS,
      CREATION_DATE, 
      STATUS, 
    CREATED_BY,
      SETTING_NAME,
      PROTOCOL, 
    AUTHENTICATION_REQUIRED
    SYSTEM_ID,
      TESTED
  FROM AOT_GEN.EMAIL_SETTINGS WHERE DELETED = 0 AND APPLICATION_ID = 2`;
 businessPool(
      req,
      res,
      statements.insertEmailNotification.statement,
    {EMAIL_FROM: req.body.EMAIL_FROM , 
      EMAIL_TO: req.body.EMAIL_TO,
      EMAIL_SUBJECT: req.body.EMAIL_SUBJECT,
      EMAIL_BODY: req.body.EMAIL_BODY,
      CREATED_BY: req.body.CREATED_BY ,
      APPLICATION_ID: req.body.APPLICATION_ID}
    ).then( insert => {
          
        
        
            res.status(200).json({
                        "status" : 200, 
                        "result" : "succeeded"
                      });

      
  });
});


router.post(
  "/insertEventSchema",
  dataexistsvalidator.checkbodydataexists,
  (req, res) => {
    servicePool(
      req,
      res,
      statements.insertEventSchema.statement,
      req.body
    );
  }
);



module.exports = router;
