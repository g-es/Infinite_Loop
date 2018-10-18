const db = require('../postgresql.js');

module.exports = {
 /**
   * creates new user record and returns the created record
   * @param { Object } req request object 
   * @param { object } res response object
   * @param { function } next function to go to next middlewear 
   */
  createUser(req, res, next) {
    //check request has correct body format
    if(Object.keys(req.body).length === 5 && req.body.username && req.body.password && req.body.role) {
      //if role equals to user, create user 
        db.one("INSERT INTO users(username, password, role, firstname, lastname) VALUES ($1, $2, $3, $4, $5) RETURNING *", [req.body.username, req.body.password, req.body.role, req.body.firstname, req.body.lastname])
        .then(data => {
          res.locals.data = data;
          return next();
        })
        .catch(err => {
          console.log('ERROR: ', err)
          return res.status(404).send({ err: err });
        });
       
    } else {
      return res.status(400).send();
    }
   
  },
  /**
   * Checks to see if user is in the database, if not calls createUser()
   * @param {Object} req - request object
   * @param {Object} res - response object
   * @param {Function} next - passes req and res to the next middleware
   */
  verifyUser(req, res, next) {
    db.any("SELECT user_id, username, password, role, firstname, lastname FROM users WHERE username = $1 AND password = $2", [req.body.username, req.body.password])
    .then((data) => {
      if(data.length === 0) {
        return res.status(300).send();
      } else{
        res.locals.data = data;
        return next();
      }
    })
    .catch((err) => {
      console.log('ERROR: ', err)
      next(err);
    })
  },
}