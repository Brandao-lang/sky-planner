import React from 'react'
import { useSelector } from 'react-redux'
import ForecastCard from './ForecastCard'
import '../../styles/forecastCard.css'

export default function Forecast() {
    const forecastDayOne = useSelector((state) => state.weather.forecast.day1)
    const forecastDayTwo = useSelector((state) => state.weather.forecast.day2)
    const forecastDayThree = useSelector((state) => state.weather.forecast.day3)
    const forecastDayFour = useSelector((state) => state.weather.forecast.day4)
    const forecastDayFive = useSelector((state) => state.weather.forecast.day5)
    
    const forecastArr = [forecastDayOne, forecastDayTwo, forecastDayThree, forecastDayFour, forecastDayFive]

    let metric = useSelector((state) => state.loggedIn.metric)
    
    const weatherForecast = forecastArr.map((day, index) => <ForecastCard key={index} temp={day[`temp${metric}`]} tempF={day.tempF} tempC={day.tempC} date={day.date} condition={day.condition} humidity={day.avgHumidity} wind_mph = {day.wind_mph} sunrise ={day.sunrise} sunset={day.sunset} icon={day.icon} />)

    console.log(weatherForecast)
    
    return (
        <div className='four-day-forecast'>
            {weatherForecast}
        </div>
    )
}