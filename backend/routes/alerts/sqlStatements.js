let statements = {
  getAllEventDefs: {
    statement: `SELECT
        event_seq,
        event_id,
        event_name,
        event_desc,
        enabled,
        created_by,
        last_update_by,
        created_date,
        last_update_date
    FROM
        event_def
    order by event_seq`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getEventActions: {
    statement: `SELECT
        action_seq,
        action_id,
        event_id,
        action_name,
        action_desc,
        action_type,
        created_by,
        last_update_by,
        created_date,
        last_update_date,
        start_date,
        enabled
    FROM
        event_actions
    where event_id = :EVENT_ID
    and nvl(enabled,'N') = 'Y'
    and trunc(sysdate) >= trunc(nvl(start_date,sysdate))`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getEventConditions: {
    statement: `SELECT
        condition_seq,
        condition_id,
        action_id,
        condition_name,
        condition_desc,
        condition_type,
        table_name,
        column_name,
        condition_operator,
        condition_value,
        created_by,
        last_update_by,
        create_date,
        last_update_date,
        nvl(AND_OR,' ') AND_OR
    FROM
        action_conditions
    where action_id = :ACTION_ID
    order by condition_seq`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getEventSchedule: {
    statement: `SELECT
        schedule_seq,
        schedule_id,
        action_id,
        type_id,
        schedule_active,
        created_by,
        last_update_by,
        created_date,
        last_update_date
    FROM
        action_schedule
    where action_id = :ACTION_ID`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getScheduleType: {
    statement: `SELECT
        type_seq,
        type_id,
        type_name,
        enabled,
        every_type,
        every_time,
        every_factor,
        created_by,
        last_update_by,
        created_date,
        last_update_date
    FROM
        schedule_type
    where type_id = :TYPE_ID`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getAllScheduleTypes: {
    statement: `SELECT
        type_seq,
        type_id,
        type_name,
        enabled,
        every_type,
        every_time,
        every_factor,
        created_by,
        last_update_by,
        created_date,
        last_update_date
    FROM
        schedule_type`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getPKColumn: {
    statement: `SELECT distinct cols.table_name, cols.column_name, cols.position, cons.status
    FROM all_constraints cons, all_cons_columns cols
    WHERE cols.table_name = :TABLE_NAME
    AND cons.constraint_type = 'P'
    AND cons.constraint_name = cols.constraint_name
    AND cons.owner = cols.owner
    AND cons.status = 'ENABLED'
    ORDER BY cols.table_name, cols.position`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getActionEmployee: {
    statement: `SELECT
    a.action_emp_seq,
    a.action_id,
    a.employee_id,
    b.EMPLOYEE_EMAIL
FROM
    action_employee a, AOT_GEN.employees b
where a.action_id = :ACTION_ID
and a.employee_id = b.employee_id`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getEventAudit: {
    statement: `SELECT
    event_seq,
    event_id,
    action_id,
    schedule_id,
    condition_id,
    event_time,
    message
FROM
    event_audit
where event_id = :EVENT_ID`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getLastAuditTransaction: {
    statement: `SELECT max(event_time)
FROM
    event_audit
where event_id = :EVENT_ID
and action_id = :ACTION_ID`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  insertEventAudit: {
    statement: `INSERT INTO event_audit (
        event_seq,
        event_id,
        action_id,
        schedule_id,
        condition_id,
        event_time,
        message
    ) VALUES (
        EVENT_AUDIT_SEQ.NEXTVAL,
        :EVENT_ID,
        :ACTION_ID,
        :SCHEDULE_ID,
        :CONDITION_ID,
        sysdate,
        :MESSAGE
    )`,
    bindings: [],
    qstring: "",
    requireCommit: true
  },
  insertEventDef: {
    statement: `INSERT INTO event_def (
        event_seq,
        event_id,
        event_name,
        event_desc,
        enabled,
        created_by,
        last_update_by,
        created_date,
        last_update_date
    ) VALUES (
        EVENT_DEF_SEQ.NEXTVAL,
        EVENT_ID_SEQ.NEXTVAL,
        :EVENT_NAME,
        :EVENT_DESC,
        :ENABLED,
        :CREATED_BY,
        NULL,
        sysdate,
        NULL
    )
    RETURN EVENT_ID, EVENT_NAME INTO :R_EVENT_ID, :R_EVENT_NAME`,
    returns: ["R_EVENT_ID", "R_EVENT_NAME"],
    bindings: [],
    qstring: "",
    requireCommit: true
  },
  insertEventAction: {
    statement: `INSERT INTO event_actions (
        action_seq,
        action_id,
        event_id,
        action_name,
        action_desc,
        action_type,
        created_by,
        last_update_by,
        created_date,
        last_update_date,
        start_date,
        enabled
    ) VALUES (
        EVENT_ACTIONS_SEQ.NEXTVAL,
        ACTION_ID_SEQ.NEXTVAL,
        :EVENT_ID,
        :ACTION_NAME,
        :ACTION_DESC,
        :ACTION_TYPE,
        :CREATED_BY,
        null,
        sysdate,
        null,
        sysdate,
        :ENABLED
    )
    RETURN EVENT_ID, ACTION_NAME, ACTION_ID INTO :R_EVENT_ID, :R_ACTION_NAME, :R_ACTION_ID`,
    returns: ["R_EVENT_ID", "R_ACTION_NAME", "R_ACTION_ID"],
    bindings: [],
    qstring: "",
    requireCommit: true
  },
  insertActionSchedule: {
    statement: `INSERT INTO action_schedule (
        schedule_seq,
        schedule_id,
        action_id,
        type_id,
        schedule_active,
        created_by,
        last_update_by,
        created_date,
        last_update_date
    ) VALUES (
        ACTION_SCHEDULE_SEQ.NEXTVAL,
        SCHEDULE_ID_SEQ.NEXTVAL,
        :ACTION_ID,
        :TYPE_ID,
        :SCHEDULE_ACTIVE,
        :CREATED_BY,
        NULL,
        sysdate,
        NULL
    )`,
    bindings: [],
    qstring: "",
    requireCommit: true
  },
  insertActionCondition: {
    statement: `INSERT INTO action_conditions (
        condition_seq,
        condition_id,
        action_id,
        condition_name,
        condition_desc,
        condition_type,
        table_name,
        column_name,
        condition_operator,
        condition_value,
        created_by,
        last_update_by,
        create_date,
        last_update_date,
        AND_OR
    ) VALUES (
        ACTION_CONDITIONS_SEQ.NEXTVAL,
        CONDITION_ID_SEQ.NEXTVAL,
        :ACTION_ID,
        :ACTION_NAME,
        :ACTION_DESC,
        :ACTION_TYPE,
        :TABLE_NAME,
        :COLUMN_NAME,
        :CONDITION_OPERATOR,
        :CONDITION_VALUE,
        :CREATED_BY,
        NULL,
        sysdate,
        NULL,
        :AND_OR
    )`,
    bindings: [],
    qstring: "",
    requireCommit: true
  },
  insertScheduleType: {
    statement: `INSERT INTO schedule_type (
        type_seq,
        type_id,
        type_name,
        enabled,
        every_type,
        every_time,
        every_factor,
        created_by,
        last_update_by,
        created_date,
        last_update_date
    ) VALUES (
        SCHEDULE_TYPE_SEQ.NEXTVAL,
        :TYPE_ID,
        :TYPE_NAME,
        :ENABLED,
        :EVERY_TYPE,
        :EVERY_TIME,
        :EVERY_FACTOR,
        :CREATED_BY,
        NULL,
        sysdate,
        NULL
    )`,
    bindings: [],
    qstring: "",
    requireCommit: true
  },
  insertScheduleLog: {
    statement: `  INSERT INTO schedule_log (
        log_id,
        message,
        message_date,
        event_id,
        action_id,
        condition_id,
        schedule_id
    ) VALUES (
        SCHEDULE_LOG_SEQ.NEXTVAL,
        :MESSAGE,
        sysdate,
        :EVENT_ID,
        :ACTION_ID,
        :CONDITION_ID,
        :SCHEDULE_ID
    )`,
    bindings: [],
    qstring: "",
    requireCommit: true
  },
  insertActionEmployee: {
    statement: `INSERT INTO action_employee (
      action_emp_seq,
      action_id,
      employee_id
  ) VALUES (
    ACTION_EMPLOYEE_SEQ.NEXTVAL,
      :ACTION_ID,
      :EMPLOYEE_ID
  )`,
    bindings: [],
    qstring: "",
    requireCommit: true
  },
  getActionExecutions: {
    statement: `SELECT
    execution_seq,
    execution_id,
    action_id,
    execution_type,
    execution_identifier_en,
    execution_identifier_ar,
    created_by,
    last_update_by,
    created_date,
    last_update_date,
    nvl(post_message,'') post_message
FROM
    action_execution
where action_id = :ACTION_ID
order by execution_id`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  insertActionExecution: {
    statement: `INSERT INTO action_execution (
      execution_seq,
      execution_id,
      action_id,
      execution_type,
      execution_identifier_en,
      execution_identifier_ar,
      created_by,
      created_date,
      POST_MESSAGE,
      EMAIL_SUBJECT,
      EMAIL_TEMPLATE 
<<<<<<< backend/routes/alerts/sqlStatements.js

=======
>>>>>>> backend/routes/alerts/sqlStatements.js
  ) VALUES (
      EXECUTION_SEQ.NEXTVAL,
      EXECUTION_ID_SEQ.NEXTVAL,
      :ACTION_ID,
      :EXECUTION_TYPE,
      :EXECUTION_IDENTIFIER_EN,
      :EXECUTION_IDENTIFIER_AR,
      :CREATED_BY,
      sysdate,
      :POST_MESSAGE,
      :EMAIL_SUBJECT,
      :EMAIL_TEMPLATE
<<<<<<< backend/routes/alerts/sqlStatements.js

=======
>>>>>>> backend/routes/alerts/sqlStatements.js
  )`,
    bindings: [],
    qstring: "",
    requireCommit: true
  },

  
  getActionExecutionresults: {
    statement: `SELECT
    result_seq,
    execution_id,
    result_message,
    created_by,
    last_update_by,
    created_date,
    last_update_date
FROM
    action_result
where execution_id = :EXECUTION_ID`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  insertActionExecutionresult: {
    statement: `INSERT INTO action_result (
      result_seq,
      execution_id,
      result_message,
      created_by,
      created_date
  ) VALUES (
      RESULT_SEQ.NEXTVAL,
      :EXECUTION_ID,
      :RESULT_MESSAGE,
      :CREATED_BY,
      sysdate
  )`,
    bindings: [],
    qstring: "",
    requireCommit: true
  },
  getallTables: {
    statement: `SELECT
    owner,
    object_name,
    owner
    || '.'
    || object_name AS fullname
FROM
    dba_objects
WHERE
    object_type = 'TABLE'
    AND owner IN ( select schema_name from event_schema)`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getTableColumns: {
    statement: `SELECT
    owner,
    table_name,
    column_name,
    DATA_TYPE
FROM
    all_tab_columns
WHERE
    upper(owner||'.'||table_name) LIKE upper(:TABLE_NAME)
and data_type in ('NUMBER', 'CHAR', 'VARCHAR2', 'DATE', 'TIMESTAMP%')`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getallEmployees: {
    statement: `SELECT
    employee_id,
    first_name
    || ' '
    || last_name AS name
  FROM
    aot_gen.employees
  WHERE
    deleted = 0`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getexectuionstat: {
    statement: `SELECT round(((select count(*) from action_execution where execution_type = 'MESSAGE') * 100) / (select count(*) from action_execution)) MESSAGE,
    round(((select count(*) from action_execution where execution_type = 'DB') * 100) / (select count(*) from action_execution)) DB,
    round(((select count(*) from action_execution where execution_type = 'WS') * 100) / (select count(*) from action_execution)) WS
FROM
 dual`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getsuccessfailurestat: {
    statement: `select (select count(*) from action_result) success,
    (select count(*) from schedule_log)   failures
from dual`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getscheduletypestat: {
    statement: `select * from (
      select every_type||' - '|| every_time name, count(*) counter
      from action_schedule a, schedule_type b
      where a.type_id = b.type_id
      group by every_type||' - '|| every_time
      order by 1 desc)
      where rownum <= 5`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },

  getAllEventAudit: {
    statement: `SELECT
    event_seq,
    event_id,
    (select a.event_name from event_def a where a.event_id = event_audit.event_id) event_name,
    event_time,
    message,
    action_id,
    schedule_id,
    condition_id
FROM
    event_audit
order by event_time desc`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },

  getAllActionResults: {
    statement: `SELECT
    result_seq,
    execution_id,
    (select a.execution_type from action_execution a where a.execution_id = action_result.execution_id) execution_type,
    (select a.execution_identifier_EN from action_execution a where a.execution_id = action_result.execution_id) execution_identifier_EN,
    result_message,
    created_by,
    last_update_by,
    created_date,
    last_update_date
FROM
    action_result`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },

  getAllScheduleLog: {
    statement: `SELECT
    log_id,
    message,
    message_date,
    event_id,
    (select a.event_name from event_def a where a.event_id = schedule_log.event_id) event_name,
    action_id,
    condition_id,
    schedule_id
FROM
    schedule_log`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  geteventSchema: {
    statement: `SELECT
    scehma_seq,
    schema_name,
    created_by,
    last_update_by,
    created_date,
    last_update_date
FROM
    event_schema`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  insertEventSchema: {
    statement: `INSERT INTO event_schema (
      scehma_seq,
      schema_name,
      created_by,
      created_date
  ) VALUES (
      SCHEMA_SEQ.NEXTVAL,
      :SCHEMA_NAME,
      'NODE',
      sysdate
  )`,
    bindings: [],
    qstring: "",
    requireCommit: true
  },
  getEmployeeData: {
    statement: `SELECT 
    EMAIL_ID, EMAIL_FROM, EMAIL_TO, 
     EMAIL_SUBJECT, EMAIL_BODY, CREATION_DATE, 
     CREATED_BY, TRY_SEND_NUMBER, SEND_DATE, 
     SEND_STATUS, SUBSIDIARY_ID, APPLICATION_ID, 
     SEND_ERROR_MESSAGE, DELETED
    FROM AOT_GEN.EMAIL_NOTIFICATIONS WHERE DELETED = 0`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getEmailsCount: {
    statement: `SELECT 
    COUNT(EMAIL_TO) EMAILS_TO_COUNT ,
    EMAIL_TO
    
                 FROM AOT_GEN.EMAIL_NOTIFICATIONS WHERE DELETED = 0 
                 GROUP BY EMAIL_TO`,
    bindings: [],
    qstring: "",
    requireCommit: false
  },
 
  insertEmailNotification: {
    statement: `INSERT INTO AOT_GEN.EMAIL_NOTIFICATIONS (
      EMAIL_ID, 
      EMAIL_FROM,
       EMAIL_TO, 
      EMAIL_SUBJECT,  
       EMAIL_BODY,
        CREATION_DATE, 
      CREATED_BY, 
      TRY_SEND_NUMBER,
       SEND_DATE, 
      SEND_STATUS,
       SUBSIDIARY_ID,
        APPLICATION_ID, 
      SEND_ERROR_MESSAGE,
       DELETED) 
   VALUES ( 
           AOT_GEN.EMAIL_NOTIFICATION_SEQ.NEXTVAL,
           :EMAIL_FROM,
           :EMAIL_TO,
           :EMAIL_SUBJECT,
           :EMAIL_BODY,
           SYSDATE,
           :CREATED_BY,
           0,
           SYSDATE,
           0,
           1,
           :APPLICATION_ID,
           NULL,
           0
   )`,
    bindings: [],
    qstring: "",
    requireCommit: true
  }
};

module.exports = statements;