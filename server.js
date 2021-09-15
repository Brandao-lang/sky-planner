const express = require('express')
const cors = require('cors')
const axios = require('axios')
const connect = require('./database/sequelize')
const Users = require('./models/users')
const Events = require('./models/events')
const conditionRestriction = require('./models/conditionRestrictions')
const eventTemperature = require('./models/eventTemperatures')
const path = require('path');
var bcrypt = require('bcryptjs')

const app = express()

//middleware
app.use(cors())

// this allows us to get access to req.body so we can recieve json data
app.use(express.json())

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'Client/build')));



app.post('/signup', async (req, res) => {
    console.log('hit')
    const {user_name, user_email, user_password, country, city, state, metric} = req.body
    
    //use bcrypt to hash password
    const passwordHash = bcrypt.hashSync(user_password, 10)

    const user = await Users.create({
        user_name,
        user_email,
        user_password: passwordHash,
        country,
        city,
        state,
        metric
    }).catch((err) => {console.log('email already in use')})

    const createdUser = user.dataValues

    console.log(createdUser)

    res.status(200).send(createdUser)
})

app.post('/login', async (req, res) => {
    const {user_email, user_password} = req.body

    const user = await Users.findAll({
        where: {
            user_email
        }
    })

    const verify = bcrypt.compareSync(user_password, user[0].dataValues.user_password)

   if (!verify) {
        return res.status(400).send('Invalid Password')
    }

  const gotUser = {
        user_name: user[0].dataValues.user_name,
        user_email: user[0].dataValues.user_email,
        country: user[0].dataValues.country,
        state: user[0].dataValues.state,
        city: user[0].dataValues.city,
        metric: user[0].dataValues.metric
    }

   res.status(200).send(gotUser)
})

app.post('/createEvent', async(req, res) => {
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
})

app.post('/allEvents', async (req,res) => {
    const {user_name, user_email} = req.body
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
})

app.post('/deleteEvent', async (req, res) => {
    const { eventId } = req.body

    const remove = await Events.destroy({
        where: {id : eventId}
    }).then(() => {
        res.status(200).send('event successfully deleted')
    }).catch(error => {
        console.log(error)
        res.status(404).send(error)
    })
})

app.post('/editEvent', async (req, res) => {
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
})

app.put('/editProfile', async (req, res) => {
    const { profileName, countryName, cityName, email } = req.body

    const updateUser = await Users.update({user_name: profileName, country: countryName,
    city: cityName},
    {where: { user_email: email}
    }).then(() => {
        res.status(200).send('update successful')
    }).catch(err => {
        console.log(err)
    })
    
})

//new code below
app.post('/data', async (req, res) => {
    const { city } = req.body

    const weatherInfo = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_KEY} &q=${city}&days=5&aqi=no&alerts=no`)

    res.status(200).send(weatherInfo)
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/Client/build/index.html'));
  });

const port = process.env.PORT || 5000;

connect()
app.listen(port, () => {
    console.log(`listening on ${port}`)
})