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
        axios.get(`/getData`, {
            params: {
                name: city
            }
        }).then(response => {
            // Dispatch actions with the data we received
            dispatch({ type: 'weather/currentWeather', payload: response.data })
            dispatch({ type: 'weather/forecastWeather', payload: response.data })
        }).catch((err) => {
            console.log(`weather data could not be retreived: ${err}`)
        })
    }, [city, dispatch])

    function formHandler() {
        setIsFormOpen(!isFormOpen)
    }

    return (
        <div className='user-dash'>
            <Options />
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