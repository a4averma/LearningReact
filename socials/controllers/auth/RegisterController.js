import bycrypt from 'bcryptjs';
import gravatar from 'gravatar';
// Load User Models
import User from '../../models/User';

const RegisterController = {};

RegisterController.create = (req, res) => {
  User.findOne({ email: req.body.email })
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
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
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


export default RegisterController;