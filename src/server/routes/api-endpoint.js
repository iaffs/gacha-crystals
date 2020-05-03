// copied (and modified) from https://github.com/arcuri82/web_development_and_api_design/blob/master/exercise-solutions/quiz-game/part-09/src/server/routes/auth-api.js

const express = require("express");
const passport = require("passport");

const Users = require("../shared/users");

const router = express.Router();

router.post("/api/login", passport.authenticate("local"), (req, res) => {
  res.status(204).send();
});

router.post("/api/signup", function (req, res) {
  const created = Users.createUser(req.body.userId, req.body.password);

  if (!created) {
    res.status(400).send();
    return;
  }

  passport.authenticate("local")(req, res, () => {
    req.session.save((err) => {
      if (err) {
        res.status(500).send();
      } else {
        res.status(201).send();
      }
    });
  });
});

router.post("/api/logout", function (req, res) {
  req.logout();
  res.status(204).send();
});

router.get("/api/user/:id", (req, res) => {
  if (req.params.id) {
    const user = Users.getUser(req.params.id);
    res.json(user);
  }
});

router.get("/api/redeemedgift", (req, res) => {
  if (req.user) {
    const userId = req.user.id;
    if (req.user.gift > 0) {
      Users.redeemedGift(userId);
    }
    res.status(200).send();
  }
});

// this endpoint updates the user wallet (deducts the price)
// and updates the number of crystals
router.get("/api/buylootbox", (req, res) => {
  if (req.user) {
    const userId = req.user.id;
    if (Users.buyLootBox(userId, false)) {
      res.status(200).send();
    } else {
      res.status(204).send();
    }
  } else {
    res.status(401).send();
  }
});

router.get("/api/sellcrystal/:id", (req, res) => {
  if (req.params.id && req.user) {
    if (Users.sellCrystal(req.user.id, req.params.id)) {
      res.status(200).send();
    } else {
      res.status(204).send();
    }
  }
});

/*
    Just return the id of the user, if the request is
    authenticated with a valid session cookie
 */
router.get("/api/user", function (req, res) {
  // if I don't have a cookie, send 401
  if (!req.user) {
    res.status(401).send();
    return;
  }

  const user = Users.getUser(req.user.id);

  // if I have a cookie, send this
  res.status(200).json({
    user,
  });
});

module.exports = router;
