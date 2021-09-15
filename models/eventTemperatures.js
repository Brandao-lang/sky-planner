const { DataTypes } = require('sequelize');
const connection = require('../database/db')

const eventTemperature = connection.define('eventTemperature', {
    min_temp:  {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    max_temp:  {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    min_humidity:  {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    max_humidity:  {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

module.exports = eventTemperature