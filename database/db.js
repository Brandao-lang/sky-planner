const Sequelize = require('sequelize')
require('dotenv').config()

const connection = new Sequelize(`${DATABASE_URL}`
, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

module.exports = connection