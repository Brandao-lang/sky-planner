import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../../styles/forecastCard.css'

export default function ForecastCard(props) {
    const dispatch = useDispatch()
    
    function currentHandler() {
        dispatch({type:'weather/updateCurrent', payload: {
            date: props.date,
            tempF: props.tempF,
            tempC: props.tempC,
            condition: props.condition,
            avgHumidity: props.humidity,
            wind_mph: props.wind_mph,
            sunrise: props.sunrise,
            sunset: props.sunset,
            icon: props.icon
        }})
    }

    let metric = useSelector((state) => state.loggedIn.metric)
    
    return (
        <div onClick={() => currentHandler()} className='forecast-cards'>
            <p>{props.date}: </p>
           <p>{props.icon}</p> 
            <h2>{props.temp}({metric})</h2>
        </div>
    )
}