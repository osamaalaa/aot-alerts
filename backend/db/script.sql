/* ---------------------------------------------------------------------- */
/* Script generated with: DeZign for Databases V10.0.2                    */
/* Target DBMS:           Oracle 12                                       */
/* Project file:          ERD DIAGRAM.dez                                 */
/* Project name:                                                          */
/* Author:                                                                */
/* Script type:           Database creation script                        */
/* Created on:            2019-01-24 11:33                                */
/* ---------------------------------------------------------------------- */


/* ---------------------------------------------------------------------- */
/* Add tables                                                             */
/* ---------------------------------------------------------------------- */

/* ---------------------------------------------------------------------- */
/* Add table "EVENT_DEF"                                                  */
/* ---------------------------------------------------------------------- */

CREATE TABLE EVENT_DEF (
    EVENT_SEQ NUMBER(10) CONSTRAINT NN_EVENT_DEF_EVENT_SEQ NOT NULL,
    EVENT_ID NUMBER(10) CONSTRAINT NN_EVENT_DEF_EVENT_ID NOT NULL,
    EVENT_NAME VARCHAR2(100) CONSTRAINT NN_EVENT_DEF_EVENT_NAME NOT NULL,
    EVENT_DESC VARCHAR2(200),
    EVENT_START_DATE DATE CONSTRAINT NN_EVENT_DEF_EVENT_START_DATE NOT NULL,
    EVENT_END_DATE DATE CONSTRAINT NN_EVENT_DEF_EVENT_END_DATE NOT NULL,
    CREATED_BY VARCHAR2(50),
    LAST_UPDATE_BY VARCHAR2(50),
    CREATED_DATE DATE,
    LAST_UPDATE_DATE DATE,
    CONSTRAINT PK_EVENT_DEF PRIMARY KEY (EVENT_SEQ),
    CONSTRAINT TUC_EVENT_DEF_1 UNIQUE (EVENT_ID)
);

/* ---------------------------------------------------------------------- */
/* Add table "EVENT_ACTIONS"                                              */
/* ---------------------------------------------------------------------- */

CREATE TABLE EVENT_ACTIONS (
    ACTION_SEQ NUMBER(10) CONSTRAINT NN_EVENT_ACTIONS_ACTION_SEQ NOT NULL,
    ACTION_ID NUMBER(10) CONSTRAINT NN_EVENT_ACTIONS_ACTION_ID NOT NULL,
    EVENT_ID NUMBER(10) CONSTRAINT NN_EVENT_ACTIONS_EVENT_ID NOT NULL,
    ACTION_NAME VARCHAR2(200) CONSTRAINT NN_EVENT_ACTIONS_ACTION_NAME NOT NULL,
    ACTION_DESC VARCHAR2(200),
    ACTION_TYPE VARCHAR2(50) CONSTRAINT NN_EVENT_ACTIONS_ACTION_TYPE NOT NULL,
    CREATED_BY VARCHAR2(40),
    LAST_UPDATE_BY VARCHAR2(40),
    CREATED_DATE DATE,
    LAST_UPDATE_DATE DATE,
    CONSTRAINT PK_EVENT_ACTIONS PRIMARY KEY (ACTION_SEQ),
    CONSTRAINT EV_ACTION_UQ UNIQUE (ACTION_ID)
);

/* ---------------------------------------------------------------------- */
/* Add table "ACTION_CONDITIONS"                                          */
/* ---------------------------------------------------------------------- */

CREATE TABLE ACTION_CONDITIONS (
    CONDITION_SEQ NUMBER(10) CONSTRAINT NN_ACTION_CONDITION_SEQ NOT NULL,
    CONDITION_ID NUMBER(10) CONSTRAINT NN_ACTIONS_CONDITION_ID NOT NULL,
    ACTION_ID NUMBER(10) CONSTRAINT NN_ACTION_ACTION_ID NOT NULL,
    CONDITION_NAME VARCHAR2(200) CONSTRAINT NN_ACTION_CONDITION NOT NULL,
    CONDITION_DESC VARCHAR2(200),
    CONDITION_TYPE VARCHAR2(200) CONSTRAINT NN_ACTION_CONDITION_T NOT NULL,
    TABLE_NAME VARCHAR2(200) CONSTRAINT NN_ACTION_CONDITIONS_N NOT NULL,
    COLUMN_NAME VARCHAR2(200) CONSTRAINT NN_ACTION_CONDITIONS_A NOT NULL,
    CONDITION_OPERATOR VARCHAR2(10) CONSTRAINT NN_ACTION_CONDITIO NOT NULL,
    CONDITION_VALUE VARCHAR2(200) CONSTRAINT NN_ACTION_CONDITIS NOT NULL,
    CREATED_BY VARCHAR2(40),
    LAST_UPDATE_BY VARCHAR2(40),
    CREATE_DATE DATE,
    LAST_UPDATE_DATE DATE,
    CONSTRAINT PK_ACTION_CONDITIONS PRIMARY KEY (CONDITION_SEQ),
    CONSTRAINT AC_CON_UQ UNIQUE (CONDITION_ID)
);

/* ---------------------------------------------------------------------- */
/* Add table "SCHEDULE_TYPE"                                              */
/* ---------------------------------------------------------------------- */

CREATE TABLE SCHEDULE_TYPE (
    TYPE_SEQ NUMBER(10) CONSTRAINT NN_SCHEDULE_TYPE_TYPE_SEQ NOT NULL,
    TYPE_ID NUMBER(10) CONSTRAINT NN_SCHEDULE_TYPE_TYPE_ID NOT NULL,
    TYPE_NAME VARCHAR2(200) CONSTRAINT NN_SCHEDULE_TYPE_TYPE_NAME NOT NULL,
    START_DATE DATE CONSTRAINT NN_SCHEDULE_TYPE_START_DATE NOT NULL,
    END_DATE DATE,
    EVERY_TYPE VARCHAR2(10) CONSTRAINT NN_SCHEDULE_TYPE_EVERY_TYPE NOT NULL,
    EVERY_TIME NUMBER CONSTRAINT NN_SCHEDULE_TYPE_EVERY_TIME NOT NULL,
    CREATED_BY VARCHAR2(40),
    LAST_UPDATE_BY VARCHAR2(40),
    CREATED_DATE DATE,
    LAST_UPDATE_DATE DATE,
    CONSTRAINT PK_SCHEDULE_TYPE PRIMARY KEY (TYPE_SEQ),
    CONSTRAINT SC_TY_UQ UNIQUE (TYPE_ID)
);

/* ---------------------------------------------------------------------- */
/* Add table "ACTION_SCHEDULE"                                            */
/* ---------------------------------------------------------------------- */

CREATE TABLE ACTION_SCHEDULE (
    SCHEDULE_SEQ NUMBER(10) CONSTRAINT ACTION_SCHEDULE_SEQ NOT NULL,
    SCHEDULE_ID NUMBER(10) CONSTRAINT ACTION_SCHEDULE_ID NOT NULL,
    ACTION_ID NUMBER(10) CONSTRAINT SCHEDULE_ACTION_ID NOT NULL,
    TYPE_ID NUMBER(10) CONSTRAINT ACTION_SCHEDULE_TYPE_ID NOT NULL,
    SCHEDULE_ACTIVE VARCHAR2(1),
    CREATED_BY VARCHAR2(40),
    LAST_UPDATE_BY VARCHAR2(40),
    CREATED_DATE DATE,
    LAST_UPDATE_DATE DATE,
    CONSTRAINT PK_ACTION_SCHEDULE PRIMARY KEY (SCHEDULE_SEQ),
    CONSTRAINT AC_SCH_UQ UNIQUE (SCHEDULE_ID)
);

/* ---------------------------------------------------------------------- */
/* Add foreign key constraints                                            */
/* ---------------------------------------------------------------------- */

ALTER TABLE EVENT_ACTIONS ADD CONSTRAINT EVENT_DEF_EVENT_ACTIONS 
    FOREIGN KEY (EVENT_ID) REFERENCES EVENT_DEF (EVENT_ID);

ALTER TABLE ACTION_CONDITIONS ADD CONSTRAINT ACTION_COND 
    FOREIGN KEY (ACTION_ID) REFERENCES EVENT_ACTIONS (ACTION_ID);

ALTER TABLE ACTION_SCHEDULE ADD CONSTRAINT EVENT_ACTIONS_ACTION_SCHEDULE 
    FOREIGN KEY (ACTION_ID) REFERENCES EVENT_ACTIONS (ACTION_ID);

ALTER TABLE ACTION_SCHEDULE ADD CONSTRAINT SCHEDULE_TYPE_ACTION_SCHEDULE 
    FOREIGN KEY (TYPE_ID) REFERENCES SCHEDULE_TYPE (TYPE_ID);
