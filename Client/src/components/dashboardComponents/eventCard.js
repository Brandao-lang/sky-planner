import React, { useState } from 'react'
import '../../styles/eventCard.css'
import { useSelector, useDispatch } from 'react-redux'
import EditEvent from './editEvent'
import axios from 'axios'
const lodash = require('lodash')

export default function EventCard(props) {
    const [isOpen, setIsOpen] = useState(false)
    const[isEditOpen, setIsEditOpen] = useState(false)
    const dispatch = useDispatch()
    
    const forecastDayOne = useSelector((state) => state.weather.forecast.day1)
    const forecastDayTwo = useSelector((state) => state.weather.forecast.day2)
    const forecastDayThree = useSelector((state) => state.weather.forecast.day3)
    const forecastDayFour = useSelector((state) => state.weather.forecast.day4)
    const forecastDayFive = useSelector((state) => state.weather.forecast.day5)
    
    const forecastArr = [forecastDayOne, forecastDayTwo, forecastDayThree, forecastDayFour, forecastDayFive]
    
    const picked = lodash.filter(forecastArr, day => day.date === props.date)

    // symbols used for the show/hide buttons
    const plusSymbol = '+'
    const minusSymbol = '-'
    
    const index = props.index
    const conditionsJoined = props.conditions.join(', ')
    
    
    function deleteHandler(i, eventId) {
        dispatch({type: 'events/removeEvent', payload: i})
        
        axios.delete('/deleteEvent', {
            params: {
                eventId
            }
        }).then((response) => {
                console.log(response)
            }).catch((err) => {
                console.log(`event could not be deleted: ${err}`)
            })
        }
    
    function showEditHandler() {
        setIsEditOpen(!isEditOpen)
    }

    let metric = useSelector((state) => state.loggedIn.metric)


   return (
        <div 
        className=
        {picked.length === 0 ? 'card-container' : 
        props.maxTemp < picked[0][`temp${metric}`] ||
        props.maxHumidity < picked[0].avgHumidity || 
        props.minTemp > picked[0][`temp${metric}`] ||
        props.minHumidity > picked[0].avgHumidity   || 
        props.conditions.includes(picked[0].condition) 
         ? 
        'warning' : 'card-container'}>
            {/* alert icon source: <a href="https://www.freeiconspng.com/img/1562">alert icon red</a> */}
            <img className=
            {picked.length === 0 ? 
            'hide-details' : 
            props.maxTemp < picked[0][`temp${metric}`] ||
            props.maxHumidity < picked[0].avgHumidity || 
            props.minTemp > picked[0][`temp${metric}`] ||
            props.minHumidity > picked[0].avgHumidity   ||
            props.conditions.includes(picked[0].condition) 
             ? 
            'show' : 'hide-details'}
            src='https://www.freeiconspng.com/thumbs/alert-icon/alert-icon-red-11.png' alt='alert icon'
            />
            <div className='symbol-btn' onClick={() => setIsOpen(!isOpen)}> 
            <button className={!isOpen ? 'visible' : 'hide-details'}>{plusSymbol}</button>
            <button className={isOpen ? 'visible' : 'hide-details'}>{minusSymbol}</button>
            </div>
            <p className='title'>{props.title}</p>
            <p>{props.date}</p>
            <div className={isOpen ? 'show-details' : 'hide-details'}>
                <hr />
                <strong>Details:</strong>
                <br/>
                <p>{props.description}</p>
                
                <p><strong className={picked.length === 0 ? '' : props.minTemp > picked[0][`temp${metric}`] || props.minHumidity > picked[0].avgHumidity ? 'warning-is-true' : ''}>Minimum:</strong> {props.minTemp}({metric}) | {props.minHumidity}%</p>
                
                <p><strong className={picked.length === 0 ? '' : props.maxTemp < picked[0][`temp${metric}`] || props.maxHumidity < picked[0].avgHumidity ? 'warning-is-true' : ''}>Maximum:</strong> {props.maxTemp}({metric}) | {props.maxHumidity}%</p>
                
                <p><strong className={picked.length === 0 ? '' : props.conditions.includes(picked[0].condition) ? 'warning-is-true' : ''}>Conditions:</strong> <br/> {conditionsJoined}</p>
                
                <div className='event-btns'>
                    <button className='delete-btn' onClick={() => deleteHandler(index, props.id)}>Delete</button>
                    <button className='edit-btn' onClick={() => setIsEditOpen(!isEditOpen)}>Edit</button>
                </div>
                
                <EditEvent isEditOpen={isEditOpen} showEditHandler={showEditHandler} id={props.id} index ={index} title={props.title} description={props.description} date={props.date} conditions={props.conditions} minTempF={props.minTemp} maxTempF={props.maxTemp} minHumidity={props.minHumidity} maxHumidity={props.maxHumidity}/>
            </div>
           
        </div>
    )
}