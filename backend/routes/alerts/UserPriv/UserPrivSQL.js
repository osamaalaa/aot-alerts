let statements = {
  getSecPriv: {
    statement: `SELECT
                SEC_PRIVILEGE_ID, APPLICATION_ID, PRIVILEGE_NAME_AR,
                   PRIVILEGE_NAME_EN, SCREEN_ID, CREATION_DATE,
                   CREATED_BY, PRIV_STATUS, DELETED
                FROM AOT_SECURITY.SECURITY_PRIVILEGES
                WHERE DELETED = 0`,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  },
  getSecPrivById: {
    statement: ` SELECT
                SEC_PRIVILEGE_ID, APPLICATION_ID, PRIVILEGE_NAME_AR,
                   PRIVILEGE_NAME_EN, SCREEN_ID, CREATION_DATE,
                   CREATED_BY, PRIV_STATUS, DELETED
                FROM AOT_SECURITY.SECURITY_PRIVILEGES
    WHERE SEC_PRIVILEGE_ID = :SEC_PRIVILEGE_ID
    AND DELETED = 0`,
    returns: [],
    bindings: [],
    qstring: "",
    requireCommit: false
  }
};

module.exports = statements;
