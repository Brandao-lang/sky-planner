import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CurrentWeatherCard from './dashboardComponents/CurrentWeatherCard'
import axios from 'axios'
import Forecast from './dashboardComponents/Forecast'
import CreateEvent from './dashboardComponents/createEvent'
import EventsDisplay from './dashboardComponents/eventsDisplay'
import Options from './dashboardComponents/options'
import '../styles/dashboard.css'

export default function Dashboard() {
    const dispatch = useDispatch()
    const [isFormOpen, setIsFormOpen] = useState(false)


    const username = useSelector((state) => state.loggedIn.user_name)
    const city = useSelector((state) => state.loggedIn.city)

    useEffect(() => {
        axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_KEY} &q=${city}&days=5&aqi=no&alerts=no`).then(response => {
            // Dispatch actions with the data we received
            console.log(response.data)
            dispatch({ type: 'weather/currentWeather', payload: response.data })
            dispatch({ type: 'weather/forecastWeather', payload: response.data })

        })
    }, [])

    function formHandler() {
        setIsFormOpen(!isFormOpen)
    }

    return (
        <div className='user-dash'>
            <Options />
            {/* <h1 className='name'>{username[0]}</h1> */}
            <h2>Welcome, {username}</h2>
            <EventsDisplay formHandler={formHandler} />
            <div className='weather-hud'>
                <CurrentWeatherCard />
                <Forecast />
            </div>
            <CreateEvent isFormOpen={isFormOpen} formHandler={formHandler} />
        </div>
    )
}