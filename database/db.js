const Sequelize = require('sequelize')
require('dotenv').config()

const connection = new Sequelize('postgres://ywzjfskzkofhdi:c82817d4ecd11e4b80d80d05cee8e3a2be06fe28da486a638fbfcf37a9652aa9@ec2-18-214-195-34.compute-1.amazonaws.com:5432/d846tgrbmnppg6', {
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