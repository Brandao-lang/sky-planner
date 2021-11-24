const Users = require('../models/users')
const Events = require('../models/events')
const conditionRestriction = require('../models/conditionRestrictions')
const eventTemperature = require('../models/eventTemperatures')

module.exports = {
    create:  async(req, res) => {
        const {user_name, user_email, eventTitle, eventDescription, eventDate, minTempF, maxTempF, minHumidity, maxHumidity, conditions} = req.body
    
        const user = await Users.findAll({
            where: {
                user_name,
                user_email
            }
        })
       
        const userId = user[0].dataValues.id
    
        const event = await Events.create({
            event_title: eventTitle,
            event_date: eventDate,
            event_description: eventDescription,
            UserId: userId
        })
    
        const findEvent = await Events.findAll({
            where: {
                event_title: eventTitle,
                event_date: eventDate,
                event_description: eventDescription,
                UserId: userId
            }
        })
    
        const eventId = findEvent[0].dataValues.id
    
        for(let i =0; i <= conditions.length; i++) {
            const restrictions = await conditionRestriction.create({
                weather_condition: conditions[i],
                EventId: eventId
            })
        }
    
        const temperatures = await eventTemperature.create({
            min_temp: minTempF,
            max_temp: maxTempF,
            min_humidity: minHumidity,
            max_humidity: maxHumidity,
            EventId: eventId
        })
            
        const responseObj = {
            eventTitle,
            eventDescription,
            eventDate,
            minTempF,
            maxTempF,
            minHumidity,
            maxHumidity,
            conditions,
            eventId
        }
    
        res.status(200).send(responseObj)
    },

    delete: async (req, res) => {
        const eventId = req.query.eventId
    
        const remove = await Events.destroy({
            where: {id : eventId}
        }).then(() => {
            res.status(200).send('event successfully deleted')
        }).catch(error => {
            console.log(error)
            res.status(404).send(error)
        })
    },

    edit: async (req, res) => {
        const {title, description, date, minTempF, maxTempF, minHumidity, maxHumidity, conditions, id} = req.body
    
        const editing = Events.update({event_title: title, event_date: date, event_description: description},
            {where: { id: id}
        })
    
        const editingTemps = eventTemperature.update({min_temp: minTempF, max_temp: maxTempF, min_humidity: minHumidity,
        max_humidity: maxHumidity},
        {where: {EventId: id}
        })
    
        const removeConditions = conditionRestriction.destroy({
            where: {EventId: id}
        })
    
        for(let i =0; i <= conditions.length; i++) {
            const conditionCreate = await conditionRestriction.create({
                weather_condition: conditions[i],
                EventId: id
            })
        }
    
        const responseObj = {
            title,
            description,
            date,
            minTempF,
            maxTempF,
            minHumidity,
            maxHumidity,
            conditions,
            id
        }
    
        console.log(responseObj)
    
        res.status(200).send(responseObj)
    }
}