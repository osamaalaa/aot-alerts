let body = [];
let oracledb = require('oracledb');

function bodyconverter(req, res, body, outparameter) {
    return new Promise((resolve, reject) => {
        try {
            for (let key in outparameter) {
                if (outparameter.hasOwnProperty(key)) {
                    body[outparameter[key]] = { type: oracledb.STRING, dir: oracledb.BIND_OUT };
                }
            }
            resolve(body);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports =
    {
        bodyconverter: bodyconverter,
        body: body
    };

