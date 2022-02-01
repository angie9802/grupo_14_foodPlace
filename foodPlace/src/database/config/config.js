const env = process.env

module.exports = {
  development: {
    username: "root",
    password: "password",
    database: "foodplace",
    host: "127.0.0.1",
    dialect: "mysql",
    port: 3306
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: env.username,
    password: env.password,
    database: env.database,
    host: env.host,
    dialect: "mysql"
  }
}
