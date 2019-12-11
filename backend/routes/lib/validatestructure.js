const Joi = require('joi');

let result;

const tokenstructure = Joi.object().keys(
    {
        USERNAME: Joi.required(),
        PASSWORD: Joi.required()
    }
);

const EventAuditStructure = Joi.object().keys(
    {
        EVENT_ID: Joi.required(),
        ACTON_ID: Joi.required(),
        SCHEDULE_ID: Joi.required(),
        CONDITION_ID: Joi.required(),
        MESSAGE : Joi.required(),
    }
);

const EventDefStructure = Joi.object().keys(
    {
        EVENT_NAME : Joi.required(),
        EVENT_DESC : Joi.required(),
        ENABLED : Joi.required(),
        CREATED_BY : Joi.required()
    }
);

const EventActionStructure = Joi.object().keys(
    {
        EVENT_ID : Joi.required(),
        ACTION_NAME : Joi.required(),
        ACTION_DESC : Joi.required(),
        ACTION_TYPE : Joi.required(),
        CREATED_BY : Joi.required(),
        ENABLED : Joi.required()
    }
);

const ActionScheduleStructure = Joi.object().keys(
    {
        ACTION_ID : Joi.required(),
        TYPE_ID : Joi.required(),
        SCHEDULE_ACTIVE : Joi.required(),
        CREATED_BY : Joi.required()
    }
);

const ActionConditionStructure = Joi.object().keys(
    {
        ACTION_ID : Joi.required(),
        ACTION_NAME : Joi.required(),
        ACTION_DESC : Joi.required(),
        ACTION_TYPE : Joi.required(),
        TABLE_NAME : Joi.required(),
        COLUMN_NAME : Joi.required(),
        CONDITION_OPERATOR : Joi.required(),
        CONDITION_VALUE : Joi.required(),
        CREATED_BY : Joi.required(),
        AND_OR : Joi.required()
    }
);

const ActionScheduleTypeStructure = Joi.object().keys(
    {
        TYPE_ID : Joi.required(),
        TYPE_NAME : Joi.required(),
        ENABLED : Joi.required(),
        EVERY_TYPE : Joi.required(),
        EVERY_TIME : Joi.required(),
        EVERY_FACTOR: Joi.required(),
        CREATED_BY : Joi.required()
    }
);

const ActionEmployeeStructure = Joi.object().keys(
    {
        ACTION_ID : Joi.required(),
        EMPLOYEE_ID : Joi.required()
    }
);


const ActionExecutionStructure = Joi.object().keys(
    {
        ACTION_ID : Joi.required(),
        EXECUTION_TYPE : Joi.required(),
        EXECUTION_IDENTIFIER_EN : Joi.required(),
        EXECUTION_IDENTIFIER_AR : Joi.required(),
        CREATED_BY : Joi.required(),
        POST_MESSAGE: Joi.required(),
        EMAIL_SUBJECT: Joi.optional(),
        EMAIL_TEMPLATE: Joi.optional()
    }
);

const loginStructure = Joi.object().keys({
        USER_NAME: Joi.required(),
        USER_PASSWORD: Joi.required()
});


function validateloginStructure(req, res, next) {
  result = Joi.validate(req.body, loginStructure);
  if (result.error == null) {
    next();
  } else {
    res.status(400).json({
      "error": "invalid payload request Structure, please verify service catalog !"
    });
  }
}

function validatetokenstructure(req, res, next) {
    result = Joi.validate(req.body, tokenstructure);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function validateEventAuditStructure(req, res, next) {

    result = Joi.validate(req.body, EventAuditStructure);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function validateEventDefStructure(req, res, next) {

    result = Joi.validate(req.body, EventDefStructure);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function validateEventActionStructure(req, res, next) {

    result = Joi.validate(req.body, EventActionStructure);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function validateActionScheduleStructure(req, res, next) {

    result = Joi.validate(req.body, ActionScheduleStructure);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function validateActionConditionStructure(req, res, next) {

    result = Joi.validate(req.body, ActionConditionStructure);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function validateActionScheduleTypeStructure(req, res, next) {

    result = Joi.validate(req.body, ActionScheduleTypeStructure);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function validateActionEmployeeStructure(req, res, next) {

    result = Joi.validate(req.body, ActionEmployeeStructure);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

function validateActionExecutionStructure(req, res, next) {

    result = Joi.validate(req.body, ActionExecutionStructure);
    if (result.error == null) {
        next();
    } else {
        res.status(400).json({ "error": "invalid payload request Structure, please verify service catalog !" });
    }
}

module.exports = {
    validatetokenstructure: validatetokenstructure,
    validateEventAuditStructure : validateEventAuditStructure,
    validateEventDefStructure : validateEventDefStructure,
    validateEventActionStructure : validateEventActionStructure,
    validateActionScheduleStructure : validateActionScheduleStructure,
    validateActionConditionStructure : validateActionConditionStructure,
    validateActionScheduleTypeStructure : validateActionScheduleTypeStructure,
    validateActionEmployeeStructure : validateActionEmployeeStructure,
    validateActionExecutionStructure : validateActionExecutionStructure,
    validateloginStructure: validateloginStructure
};
