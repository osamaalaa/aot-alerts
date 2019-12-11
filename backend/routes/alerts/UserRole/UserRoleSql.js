let statements = {
  getUserPic: {
  statement: ` select c.image
          from  AOT_GEN.employees c, AOT_SECURITY.USERS_ACCOUNTS t
          where c.employee_id = t.employee_id
          and c.deleted = 0
          and t.USER_ID = :USER_ID`,
            returns: [],
            bindings: [],
            qstring: "",
            requireCommit: false
          }
};
module.exports = statements;
