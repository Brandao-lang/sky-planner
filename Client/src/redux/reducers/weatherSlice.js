
const inititalState = {
    date: 'not available',
    tempF: 'not available',
    tempC: 'not available',
    feelsLikeF: 'not available',
    feelsLikeC: 'not available',
    condition: 'not available',
    humidity: 'not available',
    wind_mph: 'not available',
    sunrise: 'not available',
    sunset: 'not available',
    icon: 'not available',
    forecast: {
        day1: {
            date: 'not available',
            tempF: 'not available',
            tempC: 'not available',
            averageTempF: 'not available',
            averageTempC: 'not available',
            condition: 'not available',
            avgHumidity: 'not available',
            icon: 'not available'
        },
         day2: {
            date: 'not available',
            tempF: 'not available',
            tempC: 'not available',
            averageTempF: 'not available',
            averageTempC: 'not available',
            condition: 'not available',
            avgHumidity: 'not available',
            icon: 'not available'
        },
        day3: {
            date: 'not available',
            tempF: 'not available',
            tempC: 'not available',
            averageTempF: 'not available',
            averageTempC: 'not available',
            condition: 'not available',
            avgHumidity: 'not available',
            icon: 'not available'
        },
         day4: {
            date: 'not available',
            tempF: 'not available',
            tempC: 'not available',
            averageTempF: 'not available',
            averageTempC: 'not available',
            condition: 'not available',
            avgHumidity: 'not available',
            icon: 'not available'
        },
        day5: {
            date: 'not available',
            tempF: 'not available',
            tempC: 'not available',
            averageTempF: 'not available',
            averageTempC: 'not available',
            condition: 'not available',
            avgHumidity: 'not available',
            icon: 'not available'
        }
    }
}



export default function weatherSlice(state=inititalState, action) {
    switch(action.type) {
        case 'weather/currentWeather': {
            return {
                ...state, 
                 date: action.payload.forecast.forecastday[0].date,
                 tempF: action.payload.current.temp_f,
                 tempC: action.payload.current.temp_c,
                 feelsLikeF: action.payload.current.feelslike_f,
                 feelsLikeC: action.payload.current.feelslike_c,
                 condition: action.payload.current.condition.text,
                 humidity: action.payload.forecast.forecastday[0].day.avghumidity,
                 wind_mph: action.payload.forecast.forecastday[0].day.maxwind_mph,
                 sunrise: action.payload.forecast.forecastday[0].astro.sunrise,
                 sunset: action.payload.forecast.forecastday[0].astro.sunset,
                 icon: <img src={action.payload.current.condition.icon} alt='weather icon' />
            }
        }
        case 'weather/forecastWeather': {
            return {
                ...state, 
                forecast: {
                    ...state.forecast,
                    day1: {
                        ...state.forecast.day1,
                        date: action.payload.forecast.forecastday[0].date,
                        tempF:  action.payload.current.temp_f,
                        tempC:  action.payload.current.temp_c,
                        averageTempF: action.payload.forecast.forecastday[0].day.avgtemp_f,
                        averageTempC: action.payload.forecast.forecastday[0].day.avgtemp_c,
                        condition: action.payload.current.condition.text,
                        avgHumidity: action.payload.forecast.forecastday[0].day.avghumidity,
                        wind_mph: action.payload.forecast.forecastday[0].day.maxwind_mph,
                        sunrise: action.payload.forecast.forecastday[0].astro.sunrise,
                        sunset: action.payload.forecast.forecastday[0].astro.sunset,
                        icon:  <img src={action.payload.current.condition.icon} alt='weather icon' />
                    },
                    day2: {
                        ...state.forecast.day2,
                        date: action.payload.forecast.forecastday[1].date,
                        tempF: action.payload.forecast.forecastday[1].day.maxtemp_f,
                        tempC: action.payload.forecast.forecastday[1].day.maxtemp_c,
                        averageTempF: action.payload.forecast.forecastday[1].day.avgtemp_f,
                        averageTempC: action.payload.forecast.forecastday[1].day.avgtemp_c,
                        condition: action.payload.forecast.forecastday[1].day.condition.text,
                        avgHumidity: action.payload.forecast.forecastday[1].day.avghumidity,
                        wind_mph: action.payload.forecast.forecastday[1].day.maxwind_mph,
                        sunrise: action.payload.forecast.forecastday[1].astro.sunrise,
                        sunset: action.payload.forecast.forecastday[1].astro.sunset,
                        icon: <img src={action.payload.forecast.forecastday[1].day.condition.icon} alt='weather icon'/>
                    },
                    day3: {
                        ...state.forecast.day3,
                        date: action.payload.forecast.forecastday[2].date,
                        tempF: action.payload.forecast.forecastday[2].day.maxtemp_f,
                        tempC: action.payload.forecast.forecastday[2].day.maxtemp_c,
                        averageTempF: action.payload.forecast.forecastday[2].day.avgtemp_f,
                        averageTempC: action.payload.forecast.forecastday[2].day.avgtemp_c,
                        condition: action.payload.forecast.forecastday[2].day.condition.text,
                        avgHumidity: action.payload.forecast.forecastday[2].day.avghumidity,
                        wind_mph: action.payload.forecast.forecastday[2].day.maxwind_mph,
                        sunrise: action.payload.forecast.forecastday[2].astro.sunrise,
                        sunset: action.payload.forecast.forecastday[2].astro.sunset,
                        icon: <img src={action.payload.forecast.forecastday[2].day.condition.icon} alt='weather icon'/>
                    },
                    day4: {
                        ...state.forecast.day3,
                        date: action.payload.forecast.forecastday[3].date,
                        tempF: action.payload.forecast.forecastday[3].day.maxtemp_f,
                        tempC: action.payload.forecast.forecastday[3].day.maxtemp_c,
                        averageTempF: action.payload.forecast.forecastday[3].day.avgtemp_f,
                        averageTempC: action.payload.forecast.forecastday[3].day.avgtemp_c,
                        condition: action.payload.forecast.forecastday[3].day.condition.text,
                        avgHumidity: action.payload.forecast.forecastday[3].day.avghumidity,
                        wind_mph: action.payload.forecast.forecastday[3].day.maxwind_mph,
                        sunrise: action.payload.forecast.forecastday[3].astro.sunrise,
                        sunset: action.payload.forecast.forecastday[3].astro.sunset,
                        icon: <img src={action.payload.forecast.forecastday[3].day.condition.icon} alt='weather icon'/>
                    },
                    day5: {
                        ...state.forecast.day3,
                        date: action.payload.forecast.forecastday[4].date,
                        tempF: action.payload.forecast.forecastday[4].day.maxtemp_f,
                        tempC: action.payload.forecast.forecastday[4].day.maxtemp_c,
                        averageTempF: action.payload.forecast.forecastday[4].day.avgtemp_f,
                        averageTempC: action.payload.forecast.forecastday[4].day.avgtemp_c,
                        condition: action.payload.forecast.forecastday[4].day.condition.text,
                        avgHumidity: action.payload.forecast.forecastday[4].day.avghumidity,
                        wind_mph: action.payload.forecast.forecastday[4].day.maxwind_mph,
                        sunrise: action.payload.forecast.forecastday[4].astro.sunrise,
                        sunset: action.payload.forecast.forecastday[4].astro.sunset,
                        icon: <img src={action.payload.forecast.forecastday[4].day.condition.icon} alt='weather icon'/>
                    },
                }
            }
        }
        case 'weather/updateCurrent' :{
           
            return {
                ...state,
                date: action.payload.date,
                tempF: action.payload.tempF,
                tempC: action.payload.tempC,
                feelsLikeF: 'not available',
                feelsLikeC: 'not available',
                condition: action.payload.condition,
                humidity: action.payload.avgHumidity,
                wind_mph: action.payload.wind_mph,
                sunrise: action.payload.sunrise,
                sunset: action.payload.sunset,
                icon: action.payload.icon,
            }
        }
        default:
            return state
    }
}



