import React from 'react'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import '../styles/login.css'


export default function Login(props) {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            user_email: '',
            user_password: ''
    },
        onSubmit: (values, {resetForm}) => {
            
            const user = {
            user_email: formik.values.user_email,
            user_password: formik.values.user_password
        }

        // console.log(user)
        axios.post('/login', user)
        .then(res => {
            console.log(res.data)
            dispatch({type:'user/getUser', payload: res.data})
            props.history.push('/dashboard')
        })
        .catch(err => {
            console.log(err)
        })
        
        resetForm({ values: ''})
    },
        validate: values => {
            let errors = {}

            if(!values.user_email) {
                errors.user_email = 'Required'
            }
            
            if(!values.user_password) {
                errors.user_password = 'Required'
            }

            return errors
        }
    }
)

return (
    <div className='wrapper'>
    <div className='login-form'>
        <h1>Sky Planner</h1>
        <form onSubmit={formik.handleSubmit}>
            <div className='login-container'>
                <input
                    id="user_email"
                    name="user_email"
                    className='login-input top'
                    type="text"
                    placeholder="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.user_email}
                    />
                    {formik.touched.user_email && formik.errors.user_email ? <div className='login-error'>{formik.errors.user_email}</div> : null}
            </div>
            <br/>
            <div className='login-container'> 
                <input
                id="user_password"
                name="user_password"
                className='login-input'
                type="password"
                placeholder="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.user_password}
                />
                 {formik.touched.user_password && formik.errors.user_password ? <div className='login-error'>{formik.errors.user_password}</div> : null}
            </div>
            <br />
            <button className='login-button' type='Submit'>Login</button>
        </form>
    
    <Link to='signup'>Don't have an account? Signup!</Link>
    </div>
    </div>
    )
}