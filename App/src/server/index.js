const express = require('express');
var session = require('express-session')

const app = express();

var logger = function(req, res, next) {
    console.log("GOT REQUEST ! " + req.url);
    next(); // Passing the request to the next handler in the stack.
}
app.all("*", logger)
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

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

app.get('/api/facebook/auth', (req, res) => {
  const redirect_uri = 'http://localhost:3000/api/facebook/callback';
  // For eg. "http://localhost:3000/facebook/callback"
  const params = { redirect_uri, scope: 'email' };
  console.log(params);
  res.redirect(oauth2.getAuthorizeUrl(params));
});

app.get("/api/facebook/callback", function (req, res) {
    
    console.log("Query: " + JSON.stringify(req.query));
    if (req.error_reason) {
     res.send(req.error_reason);
    }
    if (req.query.code) {
     var loginCode = req.query.code;
     var redirect_uri = "http://localhost:3000/api/facebook/callback"; // Path_To_Be_Redirected_to_After_Verification
    // For eg. "/facebook/callback"
     oauth2.getOAuthAccessToken(loginCode, 
    { grant_type: 'authorization_code', 
    redirect_uri: redirect_uri}, 
      function(err, accessToken, refreshToken, params){
       if (err) {
        console.error(err);
        res.send(err);
       }
       var access_token = accessToken;
       var expires = params.expires;
       req.session.accessToken = access_token;
       req.session.expires = expires;
       console.log(req.session);

       res.redirect('/');
       }
     );
    }
   });

   app.get('/api/get_fb_profile', function(req, res) {
       console.log(req.session);
    oauth2.get("https://graph.facebook.com/me", req.session.accessToken, function(err, data ,response) {
     if (err) {
      console.error(err);
      res.send(err);
     } else {
      var profile = JSON.parse(data);
      console.log(profile);
      var profile_img_url = "https://graph.facebook.com/"+profile.id+"/picture";
        res.send(profile);
    }
    });
   });   

// app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.listen(8080, () => console.log('Listening on port 8080!'));
