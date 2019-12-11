require("module-alias/register");
let express = require("express");
let router = express.Router();
let servicePool = require('@lib/servicePool');
let statements = require("./UserPrivSQL");
let businessPool = require("@lib/businessPool");

router.get('/getSecPriv',  (req, res) => {
 
  servicePool(req, res, statements.getSecPriv.statement, []);
});
//--------------------
router.get('/getSecPrivById/:SEC_PRIVILEGE_ID', (req, res) => {
  servicePool(req, res,
    statements.getSecPrivById.statement, {
    'SEC_PRIVILEGE_ID': req.params.SEC_PRIVILEGE_ID
    }
  );
});

module.exports = router;
