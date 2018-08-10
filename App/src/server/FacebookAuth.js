const fbInfo = {
  appId: '638447646525666',
  appSecret: '232b2c67a028c78978f56776af3c9d32',
  callbackURL: 'http://localhost:3000/api/facebook/callback'
};

const user = {
  name: String,
  email: String,
  facebookID: String,
  accessToken: String
};

const express = require('express');
const session = require('express-session');
const FB = require('fb');
const bodyParser = require('body-parser');

const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;

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

passport.use(
  new Strategy(
    {
      clientID: fbInfo.appId,
      clientSecret: fbInfo.appSecret,
      callbackURL: fbInfo.callbackURL
    },
    (accessToken, refreshToken, profile, cb) => {
      user.name = profile.displayName;
      user.facebookID = profile.id;
      user.accessToken = accessToken;
      cb(null, profile);
    }
  )
);
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

app.get(
  '/api/facebook/auth',
  passport.authenticate('facebook', { scope: ['user_posts, publish_pages, manage_pages'] })
);

app.get(
  '/api/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

app.get('/api/get_fb_profile', (req, res) => {
  console.log(JSON.stringify(user.accessToken));

  FB.setAccessToken(user.accessToken);
  FB.api('me/feed', (feed) => {
    console.log(feed);
  });
  FB.api('/me/accounts', (acc) => {
    res.send(acc);
  });
});

// app.post('/api/post_to_fb', (req, res) => {
//   console.log(req.body.text);
//   console.log(JSON.stringify(user.accessToken));
//   FB.setAccessToken(user.accessToken);
//   FB.api('1797629126938200/feed', 'post', { message: req.body.text }, (post) => {
//     console.log(post);
//     if (!post || post.error) {
//       console.log(!post ? 'error occurred' : post.error);
//       return;
//     }
//     console.log(`Post Id: ${post.id}`);
//   });
//   res.send('Post Successful');
// });

// app.listen(8080, () => console.log('Listening on port 8080!'));
