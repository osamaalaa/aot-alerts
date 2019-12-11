require('module-alias/register');
let express = require('express');
let router = express.Router();
let servicePool = require('@lib/servicePool');
let businessPool = require('@lib/businessPool');
let statements = require('./UserRoleSql.js');
let bodyconverter = require('@conv/bodyConverter');
let checkData = require('@vals/dataexists');
let fs = require('fs');
let validateUserRole = require('@lib/validatestructure');
let ip = require('ip');

// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'assets/images/')
//   },
//   filename: function (req, file, cb) {
//     let extArray = file.mimetype.split("/");
//     let extension = extArray[extArray.length - 1];
//     cb(null, file.fieldname + '-' + Date.now() + '.' + extension);
//   }
// });


// //------------------------------------------
// router.get('/', function (req, res) {
//   let statement = statements.getImages.statement;
//   var binding = [];
//   if(req.query.ITEMS_ID){
//       statement = statement + ` where IMAGES_ID = :IMAGES_ID order by items_images_id desc FETCH NEXT 3 ROWS ONLY`;
//       binding = {'IMAGES_ID':Number(req.query.ITEMS_ID) }
//   }
//   businessPool(req, res, statement, binding).then(pic => {
//     if (pic.rows.length > 0) {
//       res.status(200).json({
//         "status": 200,
//         "rows": pic.rows
//       });
//     } else {
//       res.status(200).json({
//         "status": 200,
//         "rows": ["http://" + ip.address() + ":" + process.env.INVPORT + "/img/unknown.png"]
//       });
//     }
//   })
//   .catch(error => {
//     res.status(200).json({
//       status: 400,
//       message: "error while getting user image .."
//     });
//   });
// });
//----------------------------------------------

//----------------------------------------------------------------
//---------------------------------------
router.get('/getUserPic/:USER_ID/:EXT',
  (req, res) => {
    businessPool(req, res, statements.getUserPic.statement, {
        "USER_ID": req.params.USER_ID
      }, 'IMG').then(pic => {
        if (pic.rows.length > 0) {
          fs.createWriteStream('assets/profiles/pic-' + req.params.USER_ID + '.' + req.params.EXT).write(pic.rows[0][0]);
          res.status(200).json({
            "status": 200,
            "url": "http://" + ip.address() + ":" + process.env.ALEPORT + "/profiles/pic-" + req.params.USER_ID + '.' + req.params.EXT
          });
        } else {
          res.status(200).json({
            "status": 200,
            "url": "http://" + ip.address() + ":" + process.env.ALEPORT + "/img/unknown.png"
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


  module.exports = router;
