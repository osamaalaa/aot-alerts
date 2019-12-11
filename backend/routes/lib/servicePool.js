let oracleconn = require('../connectors/oracledb');

function Connect(req, res, _statement, _bindings, dataType = 'OBJECT') {

    oracleconn.doConnect(function (err, connection) {
        if (err) {
            return (err);
        } else {
            oracleconn.doExecute(
                connection, _statement, _bindings, dataType ,
                function (err, result, outBinds) {
                    if (err) {
                        let error = {
                            message: err
                        };
                        // oracleconn.doRollback(connection);
                        oracleconn.doRelease(connection);
                        res.status(400).json(error);
                    } else {

                      if (outBinds !== undefined) {
                          response = outBinds;
                          for (let key in outBinds) {
                          if (outBinds.hasOwnProperty(key)) {
                          if (Array.isArray(outBinds[key])) {
                          response[key] = outBinds[key][0];
                          } else {
                          response[key] = outBinds[key];
                          }
                          }
                          }
                          result = response;
                          }
                        let mresult = {
                            status: 200,
                            rows: result,
                            message: 'successed'
                        };
                        oracleconn.doRelease(connection);
                        res.status(200).json(mresult);
                    }
                }
            );
        }
    });

}

module.exports = Connect;
