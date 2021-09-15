import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import EditProfile from './editProfile'
import '../../styles/options.css'

export default function Options() {
    const [isOpen, setIsOpen] = useState(false)
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)

    const dispatch = useDispatch()

    function profileFormHandler() {
        setIsEditProfileOpen(!isEditProfileOpen)
    }

    return (
        <div className='options-menu'>
            <img onClick={(() => setIsOpen(!isOpen))}src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-gear-512.png' alt='options'/>
            <br/>
            <div className={isOpen ? 'show-menu' : 'hide-menu'}>
            <button onClick={() => {dispatch({type:'user/logout'})}}>Logout</button>
                <br/>
                <button onClick={(() => setIsEditProfileOpen(!isEditProfileOpen))}>Profile</button>
                <EditProfile isEditProfileOpen={isEditProfileOpen} profileFormHandler={profileFormHandler}/>
            </div>
        </div>
    )
}