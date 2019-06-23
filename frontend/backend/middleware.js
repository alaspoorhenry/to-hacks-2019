// exporting middleware for sanitization/ validation (might not use all of these)
const crypto = require("crypto");

module.exports = {
  generateSalt: function() {
    return crypto.randomBytes(16).toString("base64");
  },

  generateHash: function(password, salt) {
    const hash = crypto.createHmac("sha512", salt);
    hash.update(password);
    return hash.digest("base64");
  },

  isAuthenticated: function(req, res, next) {
    if (!req.session.user || req.session.user.length === 0) {
      return res.status(401).end("access denied");
    }
    next();
  },

  checkUsername: function(req, res, next) {
    if (!validator.isAlphanumeric(req.body.username))
      return res.status(400).end("bad input");
    next();
  },

  sanitizeContent: function(req, res, next) {
    if (!req.body.name || !req.body.date) {
      return res.status(400).end("bad input");
    }
    req.body.origin = validator.escape(req.body.name);
    req.body.destination = validator.escape(req.body.date);
    next();
  },

  checkId: function(req, res, next) {
    if (!validator.isAlphanumeric(req.params.id))
      return res.status(400).end("bad input");
    next();
  }
};
