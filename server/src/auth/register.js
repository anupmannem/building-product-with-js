import {User} from '../../db';
import {hash, asyncRequest} from '../util';


export default (app) => {
    app.post('/api/register', asyncRequest((req, res) => {
        // get user inputs
        const {login, password, passwordRepeat} = req.body;
        // validate password
        if (password !== passwordRepeat) {
            res.status(400).send({error: 'Passwords do not match!'});
            return;
        }
        // if match hash password 
        const hashedPassword = hash(password);
        // create new user
        const user = new User({
            login,
            password: hashedPassword,        
        });
        // save the user
        await user.save();
        // acknowledge
        res.sendStatus(201);
    }));
}