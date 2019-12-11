let squel = require("squel");

function checkparamdataexists(req, res, next) {
  let count = Object.keys(req.params).length;
  if (count <= 0) {
    res.status(401).json({
      message: "Body is Empty, please send data as per catalog structure !"
    });
  } else {
    next();
  }
}

function checkbodydataexists(req, res, next) {
  let count = Object.keys(req.body).length;
  if (count <= 0) {
    res.status(401).json({
      message: "Body is Empty, please send data as per catalog structure !"
    });
  } else {
    next();
  }
}

function checkconditionvalueexists(conditions) {
  let count = Object.keys(conditions).length;
  let statement;
  let select = `select count(*) as myresult `;
  let from = `from `;
  let where = ` where `;
  let x = 0;
  if (count > 0) {
    for (let key in conditions) {
      if (conditions.hasOwnProperty(key)) {
        if (x == 0) {
          statement =
            select +
            from +
            conditions[key].TABLE_NAME +
            where +
            conditions[key].COLUMN_NAME +
            ` ` +
            conditions[key].CONDITION_OPERATOR +
            ` ` +
            conditions[key].CONDITION_VALUE +
            ` ` +
            conditions[key].AND_OR;
        } else {
          statement =
            statement +
            ` ` +
            conditions[key].COLUMN_NAME +
            ` ` +
            conditions[key].CONDITION_OPERATOR +
            ` ` +
            conditions[key].CONDITION_VALUE +
            ` ` +
            conditions[key].AND_OR;
        }
        x++;
      }
    }

    return { status: true, result: statement };
  } else {
    // condition false ..
    return { status: false, result: statement };
  }
}

function ccomposeupdatestatement(tableName, setValues, where) {
  let q = squel.update();
  let result = squel
    .update()
    .table(tableName)
    .setFields(setValues)
    .where(where)
    .toString();

  return result;
}

module.exports = {
  checkparamdataexists: checkparamdataexists,
  checkbodydataexists: checkbodydataexists,
  checkconditionvalueexists: checkconditionvalueexists,
  ccomposeupdatestatement: ccomposeupdatestatement
};
