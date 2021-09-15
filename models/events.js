const { DataTypes } = require('sequelize');
const connection = require('../database/db')

const Events = connection.define('Event', {
    event_title:  {
        type: DataTypes.STRING,
        allowNull: false
    },
    event_date:  {
        type: DataTypes.STRING,
        allowNull: false
    },
    event_description:  {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

module.exports = Events