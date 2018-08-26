const linkedinInfo = {
  clientId: '86oos9zi77gl7h',
  clientKey: 'FU2FDiPbaOP3vj05',
  callbackUrl: 'http://localhost:3000/api/linkedin/callback'
};

const user = {
  name: String,
  email: String,
  id: String,
  accessToken: String
};

const express = require('express');
const http = require('http');
const https = require('https');
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
      scope: ['r_emailaddress', 'r_basicprofile', 'w_share', 'rw_company_admin'],
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
  const options = {
    method: 'POST',
    url: 'https://api.linkedin.com/v1/people/~/shares',
    qs: {
      format: 'json',
      access_token: user.accessToken
    },
    headers: {
      'postman-token': 'e3f2c8c7-4627-a88b-010b-ccd45208a77c',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      authorization: `Bearer ${user.accessToken}`
    },
    body: {
      comment: 'My first post using LinkedIn REST API and node.js',
      visibility: { code: 'anyone' }
    },
    json: true
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);

    console.log(body);
  });
});

app.listen(8080, () => console.log('Listening on port 8080 for linkedIn auth!'));
