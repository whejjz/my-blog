const Sequelize = require('sequelize')
const mysqlConfig = require('./mysql_config')

const sequelize = new Sequelize(
  mysqlConfig.database,
  mysqlConfig.username,
  mysqlConfig.password,
  {
    dialect: 'mysql',
    host: mysqlConfig.host, // 数据库服务器ip
    port: mysqlConfig.port, // 数据库运行端口
    timestamp: false,
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  }
)

module.exports = {
  sequelize
}
