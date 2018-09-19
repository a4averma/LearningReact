import mongoose from 'mongoose';

// Load the models
import Profile from '../../models/Profile';
import User from '../../models/User';

class ProfileController {
  get(req, res) {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if(!profile) {
          return res.status(404).json({ msg: "There is no profile" })
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }

  post(req, res) {
    const profileFields= {};
    profileFields.user = req.body.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.handle) profileFields.website = req.body.website;
    if(req.body.handle) profileFields.location = req.body.location;
    if(req.body.handle) profileFields.social.youtube = req.body.youtube;
    if(req.body.handle) profileFields.social.twitter = req.body.twitter;
    if(req.body.handle) profileFields.social.facebook = req.body.facebook;
    if(req.body.handle) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.handle) profileFields.social.instagram = req.body.instagram;
    if(typeof req.body.language !== undefined) {
      profileFields.language = req.body.language.split(',');
    }
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if(profile) {
          Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
          .then(profile => res.json(profile));
        } else {
          Profile.findOne({ handle: profileFields.handle })
          .then(profile => {
            if(profile){
              res.status(400).json({ msg: 'Username not available' });
            } else {
              new Profile(profileFields).save().then(profile => res.json(profile));
            }
          })
        }
      })
  }

  show(req, res) {
    Profile.findOne({ username: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        res.status(404).json({ msg: 'There is no username with this name' })
      } else {
        res.json(profile);
      }
    })
    .catch(err => res.status(400).json(err));
  }
}

export default new ProfileController();