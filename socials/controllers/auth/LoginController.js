import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { secret } from '../../config/keys';
// Load User Models
import User from '../../models/User';

const LoginController = {};
LoginController.auth = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // Find by Email
  User.findOne({ email })
    .then(user => {
      if(!user) {
        return res.status(400).json({ msg: 'Please register' });
      }

      //Check Password
      bycrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            // User Matched

            const payload = { 
              id: user.id, 
              name: user.name, 
              avatar: user.avatar 
            } 

            jwt.sign(
              payload, 
              secret, 
              (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                });
              });
          } else {
            return res.status(400).json({ msg: 'Password Incorrect' });
          }
        });
    });
}

export default LoginController;