import React from 'react'
import { Link } from 'react-router-dom'

export default function signSuccess() {
    return (
        <div>
            <h1>Sign up successful!</h1>
            <Link to='/'>Return to Login</Link>
        </div>
    )
}