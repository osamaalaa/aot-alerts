let statements = {

    insertnewemail: {
        statement: `INSERT INTO hr.emails (
            email_id,
            email_from,
            email_to,
            email_subject,
            creation_date,
            send_date,
            send_status,
            application_id,
            email_body,
            created_by
        ) VALUES (
            hr.EMAILS_SEQ.NEXTVAL,
            :EMAIL_FROM,
            nvl(:EMAIL_TO, :EMAIL_FROM),
            :EMAIL_SUBJECT,
            sysdate,
            sysdate,
            'N',
            1,
            :EMAIL_BODY,
            :CREATED_BY
        )`,
        bindings: [],
        qstring: "",
        requireCommit: true
    }
};

module.exports = statements;

