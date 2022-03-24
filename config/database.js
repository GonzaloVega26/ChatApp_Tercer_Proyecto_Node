const mysql = require("mysql2");
const ENV_VARS = require(".");

const pool = mysql.createPool({
      host: ENV_VARS.dbHost,
      port: ENV_VARS.dbPort,
      user: ENV_VARS.dbUser,
      password: ENV_VARS.dbPassword,
      database: ENV_VARS.dbName,
    })
    
    const promisedPool = pool.promise()
    
    async function query(sql){
        try {
            const results = await promisedPool.query(sql)
            return results[0]
        } catch (error) {
            console.log(error)
        }
    
        return  null
    }