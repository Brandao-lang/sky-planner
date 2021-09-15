import React from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import '../styles/signup.css'

export default function NewUser (props) {
    const formik = useFormik({
        initialValues: {
            user_name: '',
            user_email: '',
            user_password: '',
            country: '',
            state: '',
            city: '',
            metric: 'F'
          
        },
        onSubmit: (values, {resetForm}) => {
            
        const user = {
            user_name: formik.values.user_name,
            user_email: formik.values.user_email,
            user_password: formik.values.user_password,
            country: formik.values.country,
            city: formik.values.city,
            state: formik.values.state,
            metric: formik.values.metric
        }

        axios.post('/signup', user)
        .then(res => {
            console.log(res.data)
            props.history.push('/success')
        })
        .catch(err => {
            console.log(err)
            alert('email in use')
        })
        resetForm({ values: ''})

        
        },
        validate: values => {
            let errors = {}

            if(!values.user_name) {
                errors.user_name = 'Required'
            } 
            
            if(!values.user_email) {
                errors.user_email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.user_email)) {
                errors.user_email = 'Invalid email address';
              }

            if(!values.user_password) {
                errors.user_password = 'Required'
            }

            if(!values.country) {
                errors.country= 'Required'
            }

            if(!values.state) {
                errors.state= 'Required'
            }

            if(!values.city) {
                errors.city = 'Required'
            }

            return errors
        }
    }
)

  return (
       <div className="form">
        
        <form onSubmit={formik.handleSubmit}>
            <div className='form-control'>
                <label htmlFor="user_name">Name </label>
                <input
                    id="user_name"
                    name="user_name"
                    type="text"
                    placeholder="required"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.user_name}
                />
                {formik.touched.user_name && formik.errors.user_name ? <div className='error'>{formik.errors.user_name}</div> : null}
            </div>
        <br/>
            <div className='form-control'>
                <label htmlFor="user_email">Email </label>
                <input
                 id="user_email"
                 name="user_email"
                 type="text"
                 placeholder="required"
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.user_email}
                />
                {formik.touched.user_email && formik.errors.user_email ? <div className='error'>{formik.errors.user_email}</div> : null}
            </div>
        <br/>
            <div className='form-control'>
                <label htmlFor="user_password">Password </label>
                <input
                 id="user_password"
                 name="user_password"
                 type="password"
                 placeholder="required"
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.user_password}
                />
                 {formik.touched.user_password && formik.errors.user_password ? <div className='error'>{formik.errors.user_password}</div> : null}
            </div>
        <br/>
            <div className='form-control'>
                <label htmlFor="country">Country </label>
                <input
                 id="country"
                 name="country"
                 type="text"
                 placeholder="required"
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.country}
                />
                 {formik.touched.country && formik.errors.country ? <div className='error'>{formik.errors.country}</div> : null}
            </div>
        <br/>
            <div className='form-control'>
                <label htmlFor="state">State </label>
                <input
                 id="state"
                 name="state"
                 type="text"
                 placeholder="required"
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.state}
                />
                 {formik.touched.state && formik.errors.state ? <div className='error'>{formik.errors.state}</div> : null}
            </div>
        <br/>
            <div className='form-control'>
                <label htmlFor="city">City </label>
                <input
                 id="city"
                 name="city"
                 type="text"
                 placeholder="required"
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.city}
                />
                  {formik.touched.city && formik.errors.city ? <div className='error'>{formik.errors.city}</div> : null}
            </div>
        <br/>
            <label htmlFor="metric">Preferred Metric: </label>
                <br/>
                <select
                 id="metric"
                 name="metric"
                 onChange={formik.handleChange}
                 value={formik.values.metric}
            >
                <option value='F'>F</option>
                <option value='C'>C</option>
            </select>
            <br/>
           <button type="submit">confirm</button>
        </form>
    </div>
    )
}