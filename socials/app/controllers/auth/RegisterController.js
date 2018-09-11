import bycrypt from 'bcryptjs';
import gravatar from 'gravatar';
import validator from 'validator';
import validate from '../../validations/auth/register';

// Load User Models
import User from '../../../models/User';


class RegisterController {
  create(req, res) {
    // Validation
    const { errors, isValid } = validate(req.body);

    if(!isValid) {
      return res.status(400).json(errors);
    }

    let { email, name, password } = req.body;

    email = validator.normalizeEmail(email);
    name = validator.escape(name);
    password = validator.escape(password);

    User.findOne({ email: email })
    .then(user => {
      if(user) {
        return res.status(400).json({ msg: 'User already exists' });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });
        const newUser = new User({
          name: name,
          email: email,
          avatar,
          password: password
        });

        // Generate Password Hash
        bycrypt.genSalt(10, (err, salt) => {
          bycrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => {
                res.status(400).json({ email: 'Unable to register.' });
                console.log(err); 
              });

          })
        });
      }
    });
  }
}

// Singleton Export
export default new RegisterController();