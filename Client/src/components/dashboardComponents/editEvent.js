import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-modal'
import axios from 'axios'

export default function EditEvent(props) {
    const dispatch = useDispatch()

    const currentDate = useSelector((state) => state.weather.date)
    const secondDate = useSelector((state) => state.weather.forecast.day2.date)
    const thirdDate = useSelector((state) => state.weather.forecast.day3.date)
    const fourthDate = useSelector((state) => state.weather.forecast.day4.date)
    const fifthDate = useSelector((state) => state.weather.forecast.day5.date)

    const [eventTitle, setEventTitle] = useState(props.title)
    const [eventDescription, setEventDescription] = useState(props.description)
    const[eventDate, setEventDate] = useState(props.date)
    const [conditionArr, setConditionArr] = useState(props.conditions)
    const [minTempF, setMinTempF] = useState(props.minTempF)
    const [maxTempF, setMaxTempF] = useState(props.maxTempF)
    const [minHumidity, setMinHumidity] = useState(props.minHumidity)
    const [maxHumidity, setMaxHumidity] = useState(props.maxHumidity)
    
     // change handlers
     function eventTitleHandler(e) {
        setEventTitle(e.target.value)
    }
    
    function eventDescriptionHandler(e) {
        setEventDescription(e.target.value)
    }

    function eventDateHandler(e) {
        setEventDate(e.target.value)
    }
    
    function conditionHandler(e) {
        setConditionArr([...conditionArr, e.target.value])
    }
    
    function minTempFHandler(e) {
        setMinTempF(e.target.value)
    }
    
    function maxTempFHandler(e) {
        setMaxTempF(e.target.value)
    }
    
    function minHumidityHandler(e) {
        setMinHumidity(e.target.value)
    }
    
    function maxHumidityHandler(e) {
        setMaxHumidity(e.target.value)
    }

    // form submit handler
    function submitHandler(e) {
        e.preventDefault()

        if (eventTitle === '' || eventDescription === '') {
            alert('title and description fields cannot be empty')
            return
        }
        
      
        const eventObj = {
            title: eventTitle,
            description: eventDescription,
            date: eventDate,
            minTempF,
            maxTempF,
            minHumidity,
            maxHumidity,
            conditions: conditionArr,
            id: props.id
        }

       axios.put('/editEvent', eventObj)
        .then(res => {
            const resObj = res.data
            
            const disObj = {
                title: resObj.title,
                description: resObj.description,
                date: resObj.date,
                minTempF: resObj.minTempF,
                maxTempF: resObj.maxTempF,
                minHumidity: resObj.minHumidity,
                maxHumidity: resObj.maxHumidity,
                conditions: resObj.conditions,
                serverId: resObj.id,
                index: props.index
            }
            
                dispatch({type:'events/editEvent', payload: disObj})

                // Reset the form to any changes
                setEventTitle(disObj.title)
                setEventDescription(disObj.description)
                setEventDate(disObj.date)
                setConditionArr(disObj.conditions)
                setMinTempF(disObj.minTempF)
                setMaxTempF(disObj.maxTempF)
                setMinHumidity(disObj.minHumidity)
                setMaxHumidity(disObj.maxHumidity)
        })
        .catch((err) => {
            console.log(`event could not be edited: ${err}`)
        })
    }

    return(
        <div>
             <div className='event-creator'>
        <Modal isOpen={props.isEditOpen}
              style={
                  {
                    overlay: {
                        textAlign: 'center',
                    },
                    content: {
                        width: '40vw',
                        height: '50vh',
                        margin: '0 auto'
                    }
                }
              }
            >
                <h3>Editing event for {props.date}</h3>
        <form className='form-container' onSubmit={submitHandler}>
            <label htmlFor="eventTitle">Title</label>
            <input
                id="eventTitle"
                name="eventTitle"
                type="text"
                placeholder="required"
                onChange={eventTitleHandler}
                value={eventTitle}
            />
            
            <label htmlFor="eventDescription">Description</label>
            <textarea
                id="eventDescription"
                name="eventDescription"
                type="text"
                placeholder="required"
                onChange={eventDescriptionHandler}
                value={eventDescription}
            />
            
            <label htmlFor="eventDate">Select a date</label>
            <select
                id='eventDate'
                name='eventDate'
                onChange={eventDateHandler}
                value={eventDate}
            >
                <option value={currentDate} label={currentDate}/>
                <option value={secondDate} label={secondDate}/>
                <option value={thirdDate} label={thirdDate}/>
                <option value={fourthDate} label={fourthDate}/>
                <option value={fifthDate} label={fifthDate}/>
            </select>
            
            <label htmlFor="condition">Condition(s) to watch for</label>
            <select
                id='condition'
                name='condition'
                onChange={conditionHandler}
            >
                <option value='select a condition' label='select a condition'/>
                <option value='Sunny' label='Sunny'/>
                <option value='Partly cloudy' label='Partly cloudy'/>
                <option value='Overcast' label='Overcast'/>
                <option value='Fog' label='Fog'/>
                <option value='Patchy rain possible' label='Patchy rain'/>
                <option value='Moderate rain' label='Moderate rain'/>
                <option value='Heavy rain' label='Heavy rain'/>
                <option value='Torrential rain' label='Torrential rain'/>
                <option value='Thunder' label='Thunder'/>
                <option value='Light snow' label='Light snow'/>
                <option value='Moderate snow' label='Moderate snow'/>
                <option value='Heavy snow' label='Heavy snow'/>
            </select>
            <button type='button' onClick={() => setConditionArr([])}>Reset</button>
            <br/>
            {conditionArr.join(', ')}
            <br />
            <label htmlFor="minTempF">Minimum Temp</label>
            <input
                id="minTempF"
                name="minTempF"
                type="number"
                placeholder="required"
                onChange={minTempFHandler}
                value={minTempF}
            />
            
            <label htmlFor="maxTempF">Maximum Temp</label>
            <input
                id="maxTempF"
                name="maxTempF"
                type="number"
                placeholder="required"
                onChange={maxTempFHandler}
                value={maxTempF}
            />
            
            <label htmlFor="minHumidity">Minimum Humidity</label>
            <input
                id="minHumidity"
                name="minHumidity"
                type="number"
                placeholder="required"
                onChange={minHumidityHandler}
                value={minHumidity}
            />
            
            <label htmlFor="maxHumidity">Maximum Humidity</label>
            <input
                id="maxHumidity"
                name="maxHumidity"
                type="number"
                placeholder="required"
                onChange={maxHumidityHandler}
                value={maxHumidity}
            />
            <button type='submit'>Save</button>
            <button type='button' style={{marginLeft: '4px'}} onClick={props.showEditHandler}>Close</button>
        </form>
        </Modal>
    </div>
        </div>
    )
}