const router = require("express").Router();
const Match = require("../Models/match");
const { ensureLoggedIn, ensureAuthUser, ensureUserProjMatch } = require("../Middleware/auth");

// All routes are prefixded with "/matches." AUTH REQUIRED FOR ALl.

// Create new match b/w user & project. Returns match id, username, and project_id.
router.post("/:username/:project_id",
  ensureLoggedIn, ensureAuthUser,
  async function (req, res, next) {
    try {
      let newMatch = await Match.addMatch(req.params);
      return res.status(201).json(newMatch);
    } catch (e) {
      return next(e);
    };
  });

// See all PROJECT DATA for projects user has matched with.
router.get("/:username/all",
  ensureLoggedIn, ensureAuthUser,
  async function (req, res, next) {
    try {

      let allProjMatches = await Match.viewAllUserMatches(req.params);
      return res.status(200).json(allProjMatches);
    } catch (e) {
      return next(e);
    };
  });


// Remove user/self from project matches.
router.delete("/:username/:project_id",
  ensureLoggedIn, ensureAuthUser,
  async function (req, res, next) {
    try {
      let removedUser = await Match.unmatchUser(req.params);
      return res.status(200).json({ "Removed": "successful" });
    } catch (e) {
      return next(e);
    };
  });


// See ALL users who have matched with project. **ONLY ACCESSIBLE TO USERS WHO MATCHED**
router.get("/:project_id/users",
  ensureLoggedIn, ensureUserProjMatch,
  async function (req, res, next) {
    try {
      let allUserMatches = await Match.viewProjectUserMatches(req.params);
      return res.status(200).json(allUserMatches);
    } catch (e) {
      return next(e);
    };
  });



module.exports = router;