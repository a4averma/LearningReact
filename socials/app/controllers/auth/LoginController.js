import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import { secret } from '../../../config/keys';
import validate from '../../validations/auth/login';

// Load User Models
import User from '../../../models/User';

class LoginController {
  auth(req, res) {
    // Validation
    const { errors, isValid } = validate(req.body);
    if(!isValid) {
      return res.status(400).json(errors);
    }

    const email = validator.normalizeEmail(req.body.email);
    const password = validator.escape(req.body.password);

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
}

// Singleton Export
export default new LoginController();