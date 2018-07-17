require('dotenv').config();
const express = require('express')
    ,session = require('express-session')
    ,passport = require('passport')
    ,Auth0Stratagy = require('passport-auth0')
    ,massive = require('massive')
    ,bodyParser = require('body-parser')
    ,sockets = require('socket.io')

const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING,
    FRONTEND_URL
} =  process.env;

const app = express();
app.use(express.static(`${__dirname}/../build`))
app.use(bodyParser.json())

massive(CONNECTION_STRING).then(db =>{app.set('db',db)} )

app.use(session({
    secret:SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

///////auth0
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Auth0Stratagy({
    domain:DOMAIN,
    clientID:CLIENT_ID,
    clientSecret:CLIENT_SECRET,
    callbackURL:CALLBACK_URL,
    scope:'openid profile'
}, (accessToken, refreshToken, extraParams, profile, done)=> {
    //DB calls here 
    const db = app.get('db');
    let {id, displayName, picture} = profile
    db.get_user([id])
        .then(user=>{
            if(user[0]){
                done(null,user[0].id)
            }else{db.add_user([displayName, id])
                .then((createdUser)=>{
                    done(null, createdUser[0].id)
                })
            }
        })
}))

passport.serializeUser( (primaryKeyID,done)=>{
    done(null, primaryKeyID)
})
passport.deserializeUser( (primaryKeyID,done)=>{
    app.get('db')
        .find_session_user([primaryKeyID])
        .then(user=>{
            done(null, user[0])
        }) 
})

function check(req,res,next) {
    if(req.user){res.redirect(`${process.env.FRONTEND_URL}#/host`)
    } else {next()}
}
app.get('/auth', check, passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0',{
    successRedirect:`${process.env.FRONTEND_URL}#/host`
}))
app.get('/auth/logout', (req,res)=>{req.logOut();res.redirect(`${process.env.FRONTEND_URL}`)})

app.get('/auth/user', (req,res)=>{ 
    req.user
        ? res.status(200).send(req.user)
        : res.status(401).send('Not signed in')
})

app.listen(SERVER_PORT, ()=>{console.log('Connected on port',SERVER_PORT)})