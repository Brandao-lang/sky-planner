import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import '../../styles/eventCard.css'
import EventCard from './eventCard'



export default function EventsDisplay(props) {
    const dispatch = useDispatch()
    
    const plans = useSelector((state) => state.event.events)
    
    console.log(plans)
    
    const eventsList = plans.map((plan, index) => <EventCard key={index} index={index} id={plan.serverId} title ={plan.title} date={plan.date} description={plan.description} conditions={plan.conditions} minTemp={plan.minTempF} maxTemp={plan.maxTempF} minHumidity={plan.minHumidity} maxHumidity={plan.maxHumidity}/>)

    const user_name = useSelector((state) => state.loggedIn.user_name)
    const user_email = useSelector((state) => state.loggedIn.user_email)

    const userObj = {
        user_name,
        user_email
    }

    console.log('below')
    
    useEffect(() => {
        axios.post('/allEvents', userObj)
            .then(res => {
                console.log(res.data)
                dispatch({type:'events/getEvents', payload: res.data})
            })
    },[])

    
    return(
        <div>
        <div className='events-list'>
            <button className='task-btn' onClick={props.formHandler}>Add a task</button>
            {eventsList}
        </div>
        </div>
      )
}