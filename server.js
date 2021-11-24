const connect = require('./database/sequelize')
const path = require('path');
const userAccountRoute = require('./routes/userAccountRoute')
const eventsRoute = require('./routes/eventsRoute')
const dataRoute = require('./routes/dataRoute')
const express = require('express')
const cors = require('cors')

const app = express()

//middleware
app.use(cors())

// this allows us to get access to req.body so we can recieve json data
app.use(express.json())

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'Client/build')));

app.post('/signup', userAccountRoute.signup)
app.get('/login', userAccountRoute.login)
app.put('/editProfile', userAccountRoute.accountUpdate)
app.post('/createEvent', eventsRoute.create)
app.delete('/deleteEvent', eventsRoute.delete )
app.put('/editEvent', eventsRoute.edit )
app.get('/allEvents', dataRoute.getEvents)
app.get('/getData', dataRoute.getWeather)


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