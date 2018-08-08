const express = require('express');
const session = require('express-session');

const app = express();

const logger = function (req, res, next) {
  console.log(`GOT REQUEST ! ${req.url}`);
  next(); // Passing the request to the next handler in the stack.
};

app.all('*', logger);
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 } }));

const request = require('request-promise');

const OAuth2 = require('oauth').OAuth2;

const oauth2 = new OAuth2(
  '638447646525666', // App id
  '232b2c67a028c78978f56776af3c9d32', // App secret
  '',
  'https://www.facebook.com/v3.1/dialog/oauth',
  'https://graph.facebook.com/v3.1/oauth/access_token',
  null
);

app.use(express.static('dist'));

app.get('/api/facebook/auth', (req, res) => {
  const redirect_uri = 'http://localhost:3000/api/facebook/callback';
  // For eg. "http://localhost:3000/facebook/callback"
  const params = { redirect_uri, scope: 'user_posts, publish_pages, manage_pages' };
  console.log(params);
  res.redirect(oauth2.getAuthorizeUrl(params));
});

app.get('/api/facebook/callback', (req, res) => {
  console.log(`Query: ${JSON.stringify(req.query)}`);
  if (req.error_reason) {
    res.send(req.error_reason);
  }
  if (req.query.code) {
    const loginCode = req.query.code;
    const redirect_uri = 'http://localhost:3000/api/facebook/callback'; // Path_To_Be_Redirected_to_After_Verification
    // For eg. "/facebook/callback"
    oauth2.getOAuthAccessToken(
      loginCode,
      {
        grant_type: 'authorization_code',
        redirect_uri
      },
      (err, accessToken, refreshToken, params) => {
        if (err) {
          console.error(err);
          res.send(err);
        }
        const access_token = accessToken;
        const expires = params.expires;
        req.session.accessToken = access_token;
        req.session.expires = expires;
        console.log(req.session);

        res.redirect('/');
      }
    );
  }
});

// app.get('/api/get_fb_profile', (req, res) => {
//   console.log(req.session);
//   oauth2.get('https://graph.facebook.com/me', req.session.accessToken, (err, data, response) => {
//     if (err) {
//       console.error(err);
//       res.send(err);
//     } else {
//       const profile = JSON.parse(data);
//       console.log(profile);
//       const profile_img_url = `https://graph.facebook.com/${profile.id}/picture`;
//       res.send(profile);
//     }
//   });
// });

app.get('/api/get_fb_profile', (req, res) => {
  console.log(req.session);
  oauth2.get(
    'https://graph.facebook.com/v3.1/1797629126938200/feed',
    req.session.accessToken,
    (err, data, response) => {
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        const profile = JSON.parse(data);
        console.log(profile);
        const profile_img_url = `https://graph.facebook.com/${profile.id}/picture`;
        res.send(profile);
      }
    }
  );
});

app.post('/api/post_to_fb', (req, res) => {
  console.log(req.session);
  const url = 'https://graph.facebook.com/v3.1/1797629126938200/feed';
  const params = {
    access_token: req.session.accessToken,
    message: 'Hi, How are you doing today!'
  };
  console.log(params);
  console.log(req.session);
  request.post({ url, qs: params }, (err, resp, body) => {
    if (err) {
      console.error(err);
      return;
    }
    body = JSON.parse(body);
    console.log(body);
    if (body.error) {
      let error = body.error.message;
      console.error(`Error returned from facebook: ${body.error.message}`);
      if (body.error.code === 341) {
        error = 'You have reached the post limit for facebook. Please wait for 24 hours before posting again to facebook.';
        console.error(error);
      }
      res.send(error);
    }
    const return_ids = body.id.split('_');
    const user_id = return_ids[0];
    const post_id = return_ids[1];
    const post_url = `https://www.facebook.com/${user_id}/posts/${post_id}`;
    res.send(post_url);
  });
});

app.listen(8080, () => console.log('Listening on port 8080!'));
