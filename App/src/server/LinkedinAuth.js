const linkedinInfo = {
  clientId: '86vhvjnur9ld7n',
  clientKey: 'LDBY9mGyVUouBY4L',
  callbackUrl: 'http://localhost:3000/api/linkedin/callback'
};

const user = {
  name: String,
  email: String,
  id: String,
  accessToken: String
};

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const request = require('request');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new LinkedInStrategy(
    {
      clientID: linkedinInfo.clientId,
      clientSecret: linkedinInfo.clientKey,
      callbackURL: linkedinInfo.callbackUrl,
      scope: ['r_emailaddress', 'r_basicprofile'],
      state: true
    },
    (accessToken, refreshToken, profile, done) => {
      // asynchronous verification, for effect...
      user.accessToken = accessToken;
      user.name = profile.displayName;
      user.id = profile.id;
      user.email = profile.emails[0].value;
      console.log(user);
      process.nextTick(() => done(null, profile));
    }
  )
);

const app = express();

const logger = function (req, res, next) {
  console.log(`GOT REQUEST ! ${req.url}`);
  next(); // Passing the request to the next handler in the stack.
};

app.all('*', logger);
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 } }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static('dist'));
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/linkedin/auth', passport.authenticate('linkedin'), (req, res) => {
  console.log(res);
  // The request will be redirected to LinkedIn for authentication, so this
  // function will not be called.
});

app.get(
  '/api/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

// app.get('api/linkedin/info', (req, res) => {
//   console.log('API called!');
//   request.get('https://api.linkedin.com/v1/people/~?format=json', (error, response, body) => {
//     console.log('error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     console.log('body:', body);
//   });
//   res.send();
// });

app.get('/api/linkedin/info', (req, res) => {
  request.get(
    `https://api.linkedin.com/v1/people/~:(id,current-share)?format=json&oauth2_access_token=${
      user.accessToken
    }`,
    {
      host: 'api.linkedin.com',
      connection: 'Keep-Alive',
      protocol: 'https:'
    },
    (error, apiRes, body) => {
      console.log(body);
      res.send(apiRes);
    }
  );
});

app.post('/api/linkedin/post', (req, res) => {
  request.post(
    `https://api.linkedin.com/v1/people/~/shares?format=json&oauth2_access_token${
      user.accessToken
    }`,
    req,
    (error, resp, body) => {
      if (error) {
        return console.error('upload failed:', error);
      }
      console.log('Upload successful!  Server responded with:', body);
      res.send(body);
    }
  );
});

app.listen(8080, () => console.log('Listening on port 8080 for linkedIn auth!'));

/*
{
   "currentShare": {
     "author": {
       "firstName": "Ashika",
       "id": "1NTEyv41QM",
       "lastName": "Kasiviswanathan"
     },
     "comment": "It has been really helpful. Made a huge difference in my communication, problem-solving ability and confidence.",
     "id": "s6418208361191481344",
     "source": {"serviceProvider": {"name": "LI_BADGE"}},
     "timestamp": 1530220117853,
     "visibility": {"code": "anyone"}
   },
   "id": "1NTEyv41QM"
 }
 */
