const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError, ExpressError } = require("../ErrorHandling/expressError");
const Project = require("../Models/project");
const Match = require("../Models/match");
const
  { authenticateJWT,
    ensureLoggedIn,
    ensureAuthUser,
    ensureProjectOwner,
    ensureUserProjMatch } = require("./auth");
const db = require("../db");

let payload = { "username": "test_user" };

let signedUserToken = jwt.sign(payload, SECRET_KEY);

describe("JWT validity assigns res.locals approporiately.", function () {

  test("Valid JWT assigns res.locals property", function () {
    // Mocking req, res cycle and properties. Passing in token, based off validity the next route will occur.
    const req = { "headers": { authorization: `Bearer ${signedUserToken}` } };
    const res = { locals: {} };

    const next = function (e) {
      expect(e).toBeFalsy();
    };

    authenticateJWT(req, res, next);

    expect(res.locals).toEqual({
      user: {
        iat: expect.any(Number),
        username: "test_user"
      }
    });
  });


  test("Invalid JWT returns error.", function () {

    // Mocking req, res cycle and properties. Passing in INVALID token.
    const req = { "headers": { authorization: `Bearer "fakeToken"` } };
    const res = { locals: {} };

    const next = function (e) {
      expect(e).toBeFalsy();
    };

    authenticateJWT(req, res, next);

    expect(res.locals).toEqual({});
  });
});

describe("Confirm user sign in via res.locals property", function () {
  test("Valid user signed in", function () {

    let req = { "headers": { authorization: `Bearer ${signedUserToken}` } };
    let res = { locals: { user: { "username": "test_user" } } };

    const next = function (e) {
      expect(e).toBeFalsy();
    };

    ensureLoggedIn(req, res, next);
    expect(res.locals.user.username).toEqual("test_user");
  });

  test("No auth token- no user assigned to res.locals", function () {
    const req = { headers: {} };
    const res = { locals: {} };
    const next = function (e) {
      expect(e instanceof UnauthorizedError).toBeTruthy();
    };
    ensureLoggedIn(req, res, next);
  });
});



describe("Route response based on user signin/ validity", function () {
  // res.locals.user.username == req.params.username

  test("Valid user accessing route", function () {
    let req =
      { params: { username: "test_user" } };
    let res = { locals: { user: { username: "test_user" } } };

    const next = function (e) {
      expect(e instanceof UnauthorizedError).toBeFalsy();
    };

    ensureAuthUser(req, res, next);
  });

  test("Invalid user receives error.", function () {
    let req = { params: { username: "randomUserAcct" } };

    let res = { locals: { user: { username: "test_user" } } };

    const next = function (e) {
      expect(e instanceof UnauthorizedError).toBeTruthy();
    };

    ensureAuthUser(req, res, next);
  });

});

// ensureProjectOwner,

describe("Confirm project_owner status to determine route result", function () {
  test("Valid projectt_owner sending request", function () {
    // here


  });
});
// ensureUserProjMatch