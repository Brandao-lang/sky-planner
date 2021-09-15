const { DataTypes } = require('sequelize');
const connection = require('../database/db')

const conditionRestriction = connection.define('conditionRestriction', {
    weather_condition:  {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = conditionRestriction