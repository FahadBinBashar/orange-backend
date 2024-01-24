const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306

})

sequelize
  .authenticate()
  .then(() => {
    const log = `Connection has been established successfully.`;
    console.log(log);
    
  })
  .catch((err) => {
    const log = `Unable to connect to the database: ${err}`;
    console.error(log);
 
  });

module.exports = sequelize