// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
//
module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.send({
      state: 'success'
    });
  });
//
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.send({
        state: 'success'
      })
    }).catch(function(err) {
      res.send({
        state: err.errors[0].message
      })
      // res.status(422).json(err.errors[0].message);
    });
  });
//
  // Route for logging user out
  app.get("/api/logout", function(req, res) {
    req.logout();
    res.send({
      state: 'success'
    })
  });

};
