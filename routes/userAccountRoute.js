const Users = require('../models/users')
const bcrypt = require('bcryptjs')

module.exports = {
    signup: async (req, res) => {
        const {user_name, user_email, user_password, country, city, state, metric} = req.body
        
        //use bcrypt to hash password
        const passwordHash = bcrypt.hashSync(user_password, 10)
        
        const user = await Users.create({
            user_name,
            user_email,
            user_password: passwordHash,
            country,
            city,
            state,
            metric
        }).catch((err) => {console.log('email already in use')})
    
        const createdUser = user.dataValues
    
        console.log(createdUser)
    
        res.status(200).send(createdUser)
    },

    login:  async (req, res) => {
        const user_email = req.query.user_email
        const user_password = req.query.user_password
    
        const user = await Users.findAll({
            where: {
                user_email
            }
        })
    
        const verify = bcrypt.compareSync(user_password, user[0].dataValues.user_password)
    
       if (!verify) {
            return res.status(400).send('Invalid Password')
        }
    
      const gotUser = {
            user_name: user[0].dataValues.user_name,
            user_email: user[0].dataValues.user_email,
            country: user[0].dataValues.country,
            state: user[0].dataValues.state,
            city: user[0].dataValues.city,
            metric: user[0].dataValues.metric
        }
    
       res.status(200).send(gotUser)
    },

    accountUpdate: async (req, res) => {
        const { profileName, countryName, cityName, email } = req.body
    
        const updateUser = await Users.update({user_name: profileName, country: countryName,
        city: cityName},
        {where: { user_email: email}
        }).then(() => {
            res.status(200).send('update successful')
        }).catch(err => {
            console.log(err)
        })
        
    }
}