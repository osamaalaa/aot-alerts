let express = require('express');
let router = express.Router();
let multer = require('multer');
// let validator = require('@lib/validatestructure');
let ip = require('ip');
let checkData = require('@vals/dataexists');


let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/images/')
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + extension);
  }
});

// cb(null, 'assets/images/')
const upload = multer({ storage: storage });
const statements = require('./fileUploadSQL');
let servicePool = require('@lib/servicePool');
let bodyconverter = require('../../converters/bodyConverter');
let businessPool = require("@lib/businessPool");
let accessRules = require('./AccessRules');
let settings = require('@lib/settings');

// Validation !
router.use(accessRules);

//router.use(validatetoken); // temp until going to PROD ..

router.get('/', function (req, res) {
  let statement = statements.getImages.statement;
  var binding = [];
  if(req.query.ITEMS_ID){
      statement = statement + ` where IMAGES_ID = :IMAGES_ID order by items_images_id desc FETCH NEXT 3 ROWS ONLY`;
      binding = {'IMAGES_ID':Number(req.query.ITEMS_ID) }
  }
  businessPool(req, res, statement, binding).then(pic => {
    if (pic.rows.length > 0) {
      res.status(200).json({
        "status": 200,
        "rows": pic.rows
      });
    } else {
      res.status(200).json({
        "status": 200,
        "rows": ["http://" + ip.address() + ":" + process.env.INVPORT + "/img/unknown.png"]
      });
    }
  })
  .catch(error => {
    res.status(200).json({
      status: 400,
      message: "error while getting user image .."
    });
  });
});

router.post('/insertnewImage/:IMAGES_ID/:SERIAL_NO',
  upload.single(settings.genericfilename),
  validator.validateParamsforImageUpload,
  validator.validateImageType,  function (req, res) {
    let fileDetails = {
      "IMAGES_ID": req.params.IMAGES_ID,
      "SERIAL_NO": req.params.SERIAL_NO,
      "FILE_NAME": req.file.filename,
      "FILE_PATH": "http://" + ip.address() + ':' + process.env.INVPORT + '/images/' + req.file.filename
    };

    bodyconverter.bodyconverter(req, res, fileDetails, statements.insertnewImage.returns).then(upload => {
      servicePool(req, res, statements.insertnewImage.statement, upload);

    });
  });
//--------------------------------------------------------------------
  router.get('/getsingImage/:FILE_NAME', function (req, res) {
  servicePool(req, res, statements.getsingImage.statement, {FILE_NAME: req.params.FILE_NAME });
  });



  router.post("/updateImageByImageId/:items_images_id", checkData, (req, res) => {
    servicePool(
      req,
      res,
      validator.composeupdatestatement(
        "items_images",
        req.body,
        "items_images_id = " + req.params.items_images_id
      ),
      []
    );
  });

module.exports = router;
