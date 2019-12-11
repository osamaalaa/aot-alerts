let everyType = {
  oneTime: "ONE TIME",
  periodic: "PERIODIC"
};

let everyTime = {
  minute: { name: "MINUTE", seconds: 60 },
  hour: { name: "HOUR", seconds: 3600 },
  day: { name: "DAY", seconds: 86400 },
  month: { name: "MONTH", seconds: 2592000 },
  year: { name: "YEAR", seconds: 946080000 }
};

let sms ={
  url : "http://smsc.kaamilsms.com/kaamil/custAPI/sendTextSMS_Single_http_aot_test.cfm?msgSenderID=AOT&usrName=aotsms&usrPass=tue919am&msgLNG=1&gsmNumber="
};

module.exports = {
  everyType : everyType,
  everyTime : everyTime,
  sms : sms
};

