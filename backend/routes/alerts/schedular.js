require("module-alias/register");

let express = require("express");
let router = express.Router();
let dataexistsvalidator = require("@vals/dataexists");
const statements = require("./sqlStatements");
let businessPool = require("@lib/businessPool");
let notify = require("@not/notify");
let schedule = require("node-schedule");
let request = require('request');
// Concurrent Schedular to handle all events ... (run every 1 minute to check scheduled jobs ..).

//let schedular = schedule.scheduleJob("* * * * * 10", function (req, res) {
  let schedular = schedule.scheduleJob("10 * * * * *", function (req, res) {
    businessPool(
    // get All Active Events ..
    req,
    res,
    statements.getAllEventDefs.statement,
    [],
    statements.getAllEventDefs.requireCommit
  ).then(allevents => {
    for (let key in allevents.rows) {
      if (allevents.rows.hasOwnProperty(key)) {
        businessPool(
          // get Event Actions ..
          req,
          res,
          statements.getEventActions.statement, {
            EVENT_ID: allevents.rows[key].EVENT_ID
          },
          statements.getEventActions.requireCommit
        ).then(eventactions => {
          for (let actionkey in eventactions.rows) {
            if (eventactions.rows.hasOwnProperty(actionkey)) {
              businessPool(
                  // get schedule details ..
                  req,
                  res,
                  statements.getEventSchedule.statement, {
                    ACTION_ID: eventactions.rows[actionkey].ACTION_ID
                  },
                  statements.getEventSchedule.requireCommit
                )
                .then(schedule => {
                  businessPool(
                      // get conditions only if you have a proper schedue ..
                      req,
                      res,
                      statements.getEventConditions.statement, {
                        ACTION_ID: eventactions.rows[actionkey].ACTION_ID
                      },
                      statements.getEventConditions.requireCommit
                      // you need to check schedule type and compare with systdate end audit table !
                    )
                    .then(condition => {
                      let result;
                      if (condition.rows.length > 0) {
                        result = dataexistsvalidator.checkconditionvalueexists(
                          condition.rows
                        );
                        if (result.status) {
                          businessPool(req, res, result.result, [], false)
                            .then(exeresult => {
                              // Log & Take Action ..
                              //console.log(exeresult);
                              let message;
                              if (exeresult.rows[0].MYRESULT > 0) {
                                message =
                                  exeresult.message + " | CONDITION IS TRUE !";

                                businessPool(
                                    // get Event Actions ..
                                    req,
                                    res,
                                    statements.getActionExecutions.statement, {
                                      ACTION_ID: eventactions.rows[actionkey].ACTION_ID
                                    },
                                    statements.getActionExecutions.requireCommit
                                  )
                                  .then(executions => {
                                    for (let executionkey in executions.rows) {
                                      if (
                                        executions.rows.hasOwnProperty(
                                          executionkey
                                        )
                                      ) {
                                        if (
                                          executions.rows[executionkey]
                                          .EXECUTION_TYPE == "MESSAGE"
                                        ) {
                                          businessPool(
                                              req,
                                              res,
                                              statements.getActionEmployee
                                              .statement, {
                                                ACTION_ID: eventactions.rows[actionkey]
                                                  .ACTION_ID
                                              },
                                              statements.getActionEmployee
                                              .requireCommit
                                            )
                                            .then(actionEmployee => {
                                              for (let employeekey in actionEmployee.rows) {
                                                if (
                                                  actionEmployee.rows.hasOwnProperty(
                                                    employeekey
                                                  )
                                                ) {
                                                  if (executions.rows[
                                                      executionkey
                                                    ].EXECUTION_IDENTIFIER_EN != null && executions.rows[
                                                      executionkey
                                                    ].EXECUTION_IDENTIFIER_EN != "") {
                                                    notify(
                                                      req,
                                                      res,
                                                      actionEmployee.rows[
                                                        employeekey
                                                      ].EMPLOYEE_EMAIL,
                                                      executions.rows[
                                                        executionkey
                                                      ].EXECUTION_IDENTIFIER_EN +
                                                      ` Event ID# ` +
                                                      allevents.rows[key]
                                                      .EVENT_ID +
                                                      ` | ` +
                                                      allevents.rows[key]
                                                      .EVENT_NAME +
                                                      ` For Action# ` +
                                                      eventactions.rows[
                                                        actionkey
                                                      ].ACTION_ID +
                                                      ` with Type ` +
                                                      eventactions.rows[
                                                        actionkey
                                                      ].ACTION_TYPE +
                                                      ` has been achieved for All Conditions Related !`
                                                    );
                                                  }

                                                  if (executions.rows[
                                                      executionkey
                                                    ].EXECUTION_IDENTIFIER_AR != null && executions.rows[
                                                      executionkey
                                                    ].EXECUTION_IDENTIFIER_AR != "") {
                                                    notify(
                                                      req,
                                                      res,
                                                      actionEmployee.rows[
                                                        employeekey
                                                      ].EMPLOYEE_EMAIL,
                                                      executions.rows[
                                                        executionkey
                                                      ].EXECUTION_IDENTIFIER_AR +
                                                      ` Event ID# ` +
                                                      allevents.rows[key]
                                                      .EVENT_ID +
                                                      ` | ` +
                                                      allevents.rows[key]
                                                      .EVENT_NAME +
                                                      ` For Action# ` +
                                                      eventactions.rows[
                                                        actionkey
                                                      ].ACTION_ID +
                                                      ` with Type ` +
                                                      eventactions.rows[
                                                        actionkey
                                                      ].ACTION_TYPE +
                                                      ` has been achieved for All Conditions Related !`
                                                    );
                                                  }

                                                  businessPool(
                                                      req,
                                                      res,
                                                      statements
                                                      .insertActionExecutionresult
                                                      .statement, {
                                                        EXECUTION_ID: executions.rows[
                                                          executionkey
                                                        ].EXECUTION_ID,
                                                        RESULT_MESSAGE: "message has been sent !",
                                                        CREATED_BY: "AUTO"
                                                      },
                                                      statements
                                                      .insertActionExecutionresult
                                                      .requireCommit
                                                    )
                                                    .then(result => {})
                                                    .catch(error => {});
                                                }
                                              }
                                            })
                                            .catch(error => {
                                              // nothing, as error in parsing emails !
                                            });
                                        } else if (
                                          executions.rows[executionkey]
                                          .EXECUTION_TYPE == "WS"
                                        ) {
                                          // Execute, WS

                                          request(executions.rows[executionkey].EXECUTION_IDENTIFIER_EN, {
                                            json: true
                                          }, (err, res, resultbody) => {
                                            if (err) {

                                              businessPool(
                                                  req,
                                                  res,
                                                  statements
                                                  .insertActionExecutionresult
                                                  .statement, {
                                                    EXECUTION_ID: executions.rows[executionkey]
                                                      .EXECUTION_ID,
                                                    RESULT_MESSAGE: JSON.stringify(err),
                                                    CREATED_BY: "AUTO"
                                                  },
                                                  statements
                                                  .insertActionExecutionresult
                                                  .requireCommit
                                                )
                                                .then(result => {})
                                                .catch(error => {});

                                            }

                                            businessPool(
                                                req,
                                                res,
                                                statements
                                                .insertActionExecutionresult
                                                .statement, {
                                                  EXECUTION_ID: executions.rows[executionkey]
                                                    .EXECUTION_ID,
                                                  RESULT_MESSAGE: JSON.stringify(resultbody),
                                                  CREATED_BY: "AUTO"
                                                },
                                                statements
                                                .insertActionExecutionresult
                                                .requireCommit
                                              )
                                              .then(result => {

                                              })
                                              .catch(error => {

                                              });

                                          });

                                        } else if (
                                          executions.rows[executionkey]
                                          .EXECUTION_TYPE == "DB"
                                        ) {
                                          // Execute, DB
                                          let postMess;
                                          if (executions.rows[executionkey]
                                            .POST_MESSAGE != null && executions.rows[executionkey]
                                            .POST_MESSAGE != "") {
                                            postMess = executions.rows[executionkey].POST_MESSAGE;
                                          } else {
                                            postMess = {};
                                          }
                                          businessPool(
                                              req,
                                              res,
                                              executions.rows[executionkey]
                                              .EXECUTION_IDENTIFIER_EN,
                                              postMess,
                                              true
                                            ).then(executeDB => {

                                              businessPool(
                                                  req,
                                                  res,
                                                  statements
                                                  .insertActionExecutionresult
                                                  .statement, {
                                                    EXECUTION_ID: executions.rows[executionkey]
                                                      .EXECUTION_ID,
                                                    RESULT_MESSAGE: JSON.stringify(executeDB),
                                                    CREATED_BY: "AUTO"
                                                  },
                                                  statements
                                                  .insertActionExecutionresult
                                                  .requireCommit
                                                )
                                                .then(result => {})
                                                .catch(error => {});

                                            })
                                            .catch(error => {

                                              businessPool(
                                                  req,
                                                  res,
                                                  statements
                                                  .insertActionExecutionresult
                                                  .statement, {
                                                    EXECUTION_ID: executions.rows[executionkey]
                                                      .EXECUTION_ID,
                                                    RESULT_MESSAGE: JSON.stringify(error),
                                                    CREATED_BY: "AUTO"
                                                  },
                                                  statements
                                                  .insertActionExecutionresult
                                                  .requireCommit
                                                )
                                                .then(result => {})
                                                .catch(error => {});
                                            });
                                        }
                                      }
                                    }
                                  })
                                  .catch(error => {
                                    console.log(error);
                                  });
                              }

                              businessPool(
                                  // log result
                                  req,
                                  res,
                                  statements.insertEventAudit.statement, {
                                    MESSAGE: message,
                                    EVENT_ID: allevents.rows[key].EVENT_ID,
                                    ACTION_ID: eventactions.rows[actionkey].ACTION_ID,
                                    CONDITION_ID: condition.rows[0].CONDITION_ID,
                                    SCHEDULE_ID: schedule.rows[0].SCHEDULE_ID
                                  },
                                  statements.insertEventAudit.requireCommit
                                )
                                .then(finalresult => {
                                  //console.log(finalresult);
                                })
                                .catch(finalerror => {
                                  //console.log(finalerror);
                                });
                            })
                            .catch(error => {
                              // console.log(schedule);

                              businessPool(
                                  req,
                                  res,
                                  statements.insertScheduleLog.statement, {
                                    MESSAGE: error.message,
                                    EVENT_ID: allevents.rows[key].EVENT_ID,
                                    ACTION_ID: eventactions.rows[actionkey].ACTION_ID,
                                    CONDITION_ID: condition.rows[0].CONDITION_ID,
                                    SCHEDULE_ID: schedule.rows[0].SCHEDULE_ID
                                  },
                                  statements.insertScheduleLog.requireCommit
                                )
                                .then(finalresult => {
                                  //console.log(finalresult);
                                })
                                .catch(finalerror => {
                                  //console.log(finalerror);
                                });
                            });
                        }
                      }
                    })
                    .catch(conditionerror => {
                      //console.log(conditionerror);
                    });
                })
                .catch(scheduleerror => {
                  //console.log(scheduleerror);
                });
            }
          }
        });
      }
    }
  });
});

module.exports = router;