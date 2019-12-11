module.exports = {
    user          : process.env.NODE_ORACLEDB_USER || "aotalert",
    password      : process.env.NODE_ORACLEDB_PASSWORD || "aotalert123",
    connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "Dev",
    externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
  };
