import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../../styles/editProfileForm.css'
import Modal from 'react-modal'
import axios from 'axios'

export default function EditProfile(props) {
    const dispatch = useDispatch()
    const username = useSelector((state) => state.loggedIn.user_name)
    const countryname = useSelector((state) => state.loggedIn.country)
    const cityname = useSelector((state) => state.loggedIn.city)
    const email = useSelector((state) => state.loggedIn.user_email)

    const [profileName, setProfileName] = useState(username)
    const [countryName, setCountryName] = useState(countryname)
    const [cityName, setCityName] = useState(cityname)

    function profileNameHandler(e) {
        setProfileName(e.target.value)
    }
    
    function countryNameHandler(e) {
        setCountryName(e.target.value)
    }
    
    function cityNameHandler(e) {
        setCityName(e.target.value)
    }
    
    function submitHandler(e) {
        e.preventDefault()

        const profileObj = {
            profileName,
            countryName,
            cityName,
            email
        }

        axios.put('/editProfile', profileObj)
            .then(response => {
                dispatch({type:'user/updateUser', payload: profileObj})
            })
    }



    return (
        <div className='edit-profile-container'>
            <Modal isOpen={props.isEditProfileOpen}
              style={
                  {
                    overlay: {
                        textAlign: 'center',
                    },
                    content: {
                        width: '40vw',
                        height: '30vh',
                        margin: '0 auto'
                    }
                }
              }
            >
                <h4>Any changes will require a re-log!</h4>
                <form className='profile-form-container' onSubmit={submitHandler}>
                    <label htmlFor='profile-name'>Profile Name</label>
                    <input 
                    id='profile-name'
                    name='profile-name'
                    type='text'
                    onChange={profileNameHandler}
                    value={profileName}
                    />
                    <br/>
                    <label htmlFor='country-name'>Country</label>
                    <input 
                    id='country-name'
                    name='country-name'
                    type='text'
                    onChange={countryNameHandler}
                    value={countryName}
                    />
                    <br/>
                    <label htmlFor='city-name'>City</label>
                    <input 
                    id='city-name'
                    name='city-name'
                    type='text'
                    onChange={cityNameHandler}
                    value={cityName}
                    />
                     <br/>
                    <button type='submit'>Save changes</button>
                    <button type='button' style={{marginLeft: '4px'}} onClick={() => props.profileFormHandler()}>Close</button>
                </form>
                <br/>
               {/* <button type='button' onClick={() => props.profileFormHandler()}>Close</button> */}
            </Modal>
        </div>
    )
}