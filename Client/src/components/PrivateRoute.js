import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Dashboard from './Dashboard'
import { useSelector } from 'react-redux'



export default function PrivateRoute(...rest) {

    const loggedIn = useSelector((state) => state.loggedIn.isLoggedIn)
   
    return(
     <Route {...rest} render={() => {
        if (loggedIn) {
            console.log()
            return <Dashboard />
                    
        } else {
            return <Redirect to="/" />
        }
     }}/>
   )
}