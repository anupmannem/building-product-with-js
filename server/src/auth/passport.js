/* -------------------------------- PACKAGES -------------------------------- */

import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

import {User} from '../../db';
import {hash} from '../util';

/* -------------------------------------------------------------------------- */

/* -------------------------------- Serialize & Deserialize ------------------------------- */

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
    let user = null;
    try {
        // get user based on id
        user = await User.get(id).run()
    } catch(e) {
        done(e, false);
        return;
    }
    done(null, user);
})

/* -------------------------------------------------------------------------- */


/* ----------------------------- Local Strategy ----------------------------- */


passport.new(new LocalStrategy(async (login, password, done) => {
    const users = await User.findOne({login}).limit(1);
    // get the first match
    const user = users[0];
    // check if user exists
    if(!user) {
        return done(null, false);
    }
    // validate user password with hash
    if(user.password != hash(password)) {
        return done(null, false);
    }
    // if success, return the user
    return done(null, user);
}));

/* -------------------------------------------------------------------------- */
