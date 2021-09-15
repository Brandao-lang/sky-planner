const Users = require ('../models/users')
const Events = require ('../models/events')
const ConditionRestriction = require ('../models/conditionRestrictions')
const EventTemperature = require ('../models/eventTemperatures')
const connection = require('../database/db')

// eslint-disable-next-line no-undef
 module.exports = connect = () => { 
Users.hasMany(Events, {as: 'All_Events'})
Events.hasMany(ConditionRestriction, {as: 'All_Restrictions'})
EventTemperature.belongsTo(Events)

connection
.sync({
    logging: console.log,
    // force: true
}).then(() => console.log('connection to database established successfully'))
.catch(err => {console.log(err)})

 }
