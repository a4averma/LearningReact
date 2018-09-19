import express from 'express';
const router = express.Router();
import passport from 'passport';

// Load the Controller

import ProfileController from '../../app/controllers/ProfileController';

/*
@route        GET api/profile
@description  Get Current user's profile
@access       Private
*/
router.get('/', passport.authenticate('jwt', { session: false }), ProfileController.get);

/*
@route        POST api/profile
@description  Create current user's profile
@access       Private
*/

router.post('/', passport.authenticate('jwt', { session: false }), ProfileController.post);

/*
@route        POST api/profile
@description  Get user's profile by handle
@access       Private
*/

router.get('/:username', passport.authenticate('jwt', { session: false }), ProfileController.show);

module.exports = router;
