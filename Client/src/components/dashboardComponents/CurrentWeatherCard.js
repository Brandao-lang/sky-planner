import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../styles/currentWeatherCard.css'
const lodash = require('lodash')

export default function CurrentWeatherCard() {
    const [currentIndex, setCurrentIndex] = useState(0)
    let metric = useSelector((state) => state.loggedIn.metric)
    
    const city = useSelector((state) => state.loggedIn.city)
    const temp = useSelector((state) => state.weather[`temp${metric}`])
    const date = useSelector((state) => state.weather.date)
    const condition = useSelector((state) => state.weather.condition)
    const humidity = useSelector((state) => state.weather.humidity)
    const wind_mph = useSelector((state) => state.weather.wind_mph)
    const sunrise = useSelector((state) => state.weather.sunrise)
    const sunset = useSelector((state) => state.weather.sunset)
    const icon = useSelector((state) => state.weather.icon)
    
    const allEvents = useSelector((state) => state.event.events)
    let selectedEvent = lodash.filter(allEvents, day => day.date === date)

    if (selectedEvent.length === 0) {
        selectedEvent = [{title: 'nothing planned for this day', description: ''}]
    }

    function nextHandler() {
        if (currentIndex === selectedEvent.length-1 ) {
            return
        }
        setCurrentIndex(currentIndex + 1)
    }
    
    function backHandler() {
        if (currentIndex === 0 ) {
            return
        }
        setCurrentIndex(currentIndex - 1)
    }

    const dispatch = useDispatch()


    
    return (
        <div className='current-day-card'>
            <div className='weather-info'>
                <div className='weather-container'>
                    <div className='geo-info'>
                       {/* icon source: <div>Icons made by <a href="https://www.flaticon.com/authors/those-icons" title="Those Icons">Those Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
                       <button onClick={() => dispatch({type:'user/updateMetric'})}>C/F</button>
                       <h1>
                           <img src='https://image.flaticon.com/icons/png/512/484/484167.png' alt='location icon' /> {city}
                        </h1>
                        <p>{date}</p>
                    </div> 
                    <div className='temp-info'>
                        {icon}
                        <h1>{temp}({metric})</h1>
                    </div>
                    {/* <h3>feels like {feelsLikeF}(F)</h3> */}
                    <div className='weather-data'>
                        <h4>{condition}</h4>
                        <span>humidity: {humidity}%</span>
                        <br/>
                        <span>wind mph: {wind_mph}</span>
                    </div>
                    <br className='break' />
                    <img className='sun' src="https://i.imgur.com/cJOGFQI.png" alt='sunrise' />
                    <img className='sun' src='https://www.pinclipart.com/picdir/big/520-5209158_computer-icons-sunset-clip-art-sunrise-black-and.png' alt='sunset'/>
                    <br className='break'/>
                    <p className='rise'>{sunrise}</p>
                    <p className='set'>{sunset}</p> 
                </div>
            </div>
            <div className='current-event'>
                
                {selectedEvent[0].title === 'nothing planned for this day' ? 
                <div>
                    <h1>{selectedEvent[0].title}</h1>
                   <img src='https://www.vectorkhazana.com/assets/images/products/Cute_Sloths_SVG_Layered_Cutting_file_Kawaii_baby_sloth_7.png' alt='cartoon-sloth'/> 
                </div>
                :
                !selectedEvent[currentIndex] ? 
                    <div>
                    <h1>{selectedEvent[0].title}</h1>
                    <h2>Event Details: </h2>
                    <h4>{selectedEvent[0].description}</h4>
                    {setCurrentIndex(0)}
                    <p className='position'> 1 / {selectedEvent.length}</p> 
                </div>
                :
                <div>
                    <h1>{selectedEvent[currentIndex].title}</h1>
                    <h3>Event Details: </h3>
                    <p>{selectedEvent[currentIndex].description}</p>
                    <p className='position'>{currentIndex + 1} / {selectedEvent.length}</p>
                </div>
                    }

                
                <button className='back' onClick={backHandler}>Back</button>
                {/* <p>{currentIndex + 1} / {selectedEvent.length}</p> */}
                <button className='next' onClick={nextHandler}>Next</button>
                </div>
            </div>
        
    )
}