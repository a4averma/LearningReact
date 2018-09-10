import express from 'express';
const router = express.Router();
import passport from 'passport';

// Load Controllers
import RegisterController from '../../controllers/auth/RegisterController';
import LoginController from '../../controllers/auth/LoginController';

/* 
@route        GET api/posts/test
@description  Test users route
@access       Public
*/

router.get('/test', (req, res) => res.json({msg: "users works"}));

/* 
  @route        GET api/users/register
  @description  Register a user
  @access       Public
*/

router.post('/register', RegisterController.create);

/* 
  @route        GET api/users/login
  @description  Return JWT Token | Login User
  @access       Public
*/

router.post('/login', LoginController.auth);

/* 
@route        GET api/users/current
@description  Return Current User
@access       Private
*/
router.get(
  '/current', 
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar
    });
    }
  );

module.exports = router;
