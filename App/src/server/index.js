const express = require('express');

const app = express();
const cors = require('cors');

// const os = require('os');
const request = require('request-promise');

const OAuth2 = require('oauth').OAuth2;

const oauth2 = new OAuth2(
  '638447646525666', // App id
  '232b2c67a028c78978f56776af3c9d32', // App secret
  '',
  'https://www.facebook.com/dialog/oauth',
  'https://graph.facebook.com/oauth/access_token',
  null
);

app.use(express.static('dist'));
app.use(cors({ credentials: true, origin: true }));

app.get('/api/facebook/auth', (req, res) => {
  const redirect_uri = 'http://localhost:8080/facebook/callback';
  // For eg. "http://localhost:3000/facebook/callback"
  const params = { redirect_uri, scope: 'default' };
  console.log(params);
  res.redirect(oauth2.getAuthorizeUrl(params));
});

// app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.listen(8080, () => console.log('Listening on port 8080!'));
