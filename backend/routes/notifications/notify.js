let businessPool = require('@lib/businessPool');
let notifystatement = require('./notificationSqlstatements');

let content = {
    from: 'aot.medan@aot.sa',
    subject: 'Alerts System, # Node Project !'
};

function notify(req, res, emails, message) {

    return new Promise((resolve, reject) => {
        let template = `<div width="100%" style="background: #eceff4; padding: 50px 20px; color: #514d6a;">
<div style="max-width: 700px; margin: 0px auto; font-size: 14px">
    <table border="0" cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 20px">
        <tr>
            <td style="vertical-align: top;">
                <img src="http://127.0.0.1:9001/images/aot.jpg" alt="AOT MW | Alerts Engine !" style="height: 40px" />
            </td>
            <td style="text-align: right; vertical-align: middle;">
                <span style="color: #a09bb9;">
                AOT MW | WorkFlow Engine !
                </span>
            </td>
        </tr>
    </table>
    <div style="padding: 40px 40px 20px 40px; background: #fff;">
        <table border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
            <tbody><tr>
                <td>
                    <p>Hi there,</p>
                    <p>` + message + `</p>
                    <p>AOT Alerts |  Appreciate Your Quick Response !</p>
                    <p>AOT MW | Alerts Engine, Node Project !</p>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <div style="text-align: center; font-size: 12px; color: #a09bb9; margin-top: 20px">
        <p>
            AOT Software Inc., Malaz, Riyadh PO 22621
            <br />
            do you need more details? <a href="javascript: void(0);" style="color: #a09bb9; text-decoration: underline;">contact us !</a>
            <br />
            Powered by AOT | Node
        </p>
    </div>
</div>
</div>`;

                let myemail = {
                    "EMAIL_FROM": content.from,
                    "EMAIL_TO": emails,
                    "EMAIL_SUBJECT": content.subject,
                    "EMAIL_BODY": template,
                    "CREATED_BY" : null
                };

                businessPool(req, res, notifystatement.insertnewemail.statement, myemail, notifystatement.insertnewemail.requireCommit).then(email => {
                }).catch(error => { console.log(error); });
            
    });
}

module.exports = notify;