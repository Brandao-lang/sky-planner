const Users = require('../models/users')
const Events = require('../models/events')
const conditionRestriction = require('../models/conditionRestrictions')
const eventTemperature = require('../models/eventTemperatures')
const axios = require('axios')

module.exports = {
    getEvents: async (req,res) => {
        const user_name = req.query.user_name
        const user_email = req.query.user_email
        const allEventsArr = []
    
        const user = await Users.findAll({
            where: {
                user_name,
                user_email
            }
        })
        
        const userId = user[0].dataValues.id
    
        const events = await Events.findAll({
            where: {
                UserId: userId
            }
        })
    
        for (let i =0; i < events.length; i++) {
           const eventId = events[i].dataValues.id
           let cons = []
           
           const findCondition = await conditionRestriction.findAll({
               where: {
                   EventId: eventId
               }
           })
    
            for (let i= 0; i < findCondition.length; i++) {
                cons.push(findCondition[i].weather_condition)
           }
    
           const findTemps = await eventTemperature.findAll({
            where: {
                EventId: eventId
            }
        })
            
            let plan = {
                title: events[i].event_title,
                date: events[i].event_date,
                description: events[i].event_description,
                minTempF: findTemps[0].min_temp,
                maxTempF: findTemps[0].max_temp,
                minHumidity: findTemps[0].min_humidity,
                maxHumidity: findTemps[0].max_humidity,
                conditions: cons,
                serverId: eventId
            }
    
            allEventsArr.push(plan)
            cons = []
        }
        
        res.status(200).send(allEventsArr)
    },

    getWeather: async (req, res) => {
        const name = req.query.name        
        
        const weatherCall = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_KEY}&q=${name}&days=5&aqi=no&alerts=no`).then(response => {
            const weatherInfo = response.data
            res.status(200).send(weatherInfo)
        })
    }
}