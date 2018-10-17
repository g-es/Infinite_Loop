//server exported in order to close database after tests are done
const db = require('../postgresql.js');

module.exports = {

  /**
   * gets all posts from SQL database, returns array of posts to client
   * @param {Object} req request object 
   * @param {Object} res response object
   * @param {function} next sends req and res to next middleware
   */
  getPosts(req, res, next) {
    db.any('SELECT p.post_id, p.student_id, p.helper_id, s.firstname AS student_name, h.firstname AS helper_name, p.problem, p.expect, p.suspect, p.tried, p.status, sta.status FROM ((posts AS p INNER JOIN users AS s ON p.student_id = s.user_id) LEFT JOIN users as h ON p.helper_id = h.user_id) LEFT JOIN status as sta ON p.status = sta.status_id')
      .then(data => {
        res.locals.data = data;
        return next();
      })
      .catch(err => {
        return next(err);
      });
  },
  /**
   * creates post in database, sending relevant info to be saved
   * @param {object} req request object
   * @param {object} res response object
   * @param {function} next sends req and res to next middleware
   */
  createPost(req, res, next) {
    if (Object.keys(req.body).length === 6) {
      db.one("INSERT INTO posts(student_id, problem, expect, tried, suspect, topic) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [req.body.user_id, req.body.problem, req.body.expect, req.body.tried, req.body.suspect, req.body.topic])
        .then(data => {
          console.log('data');
          res.locals.data = data;
          next();
        })
        .catch(err => {
          console.log(err);
          next(err);
        })
    } else {
      res.status(400).send('Invalid post');
    }
  },
  /**
   * change status by incrementing status id by one, indicating open -> claimed, or claimed -> closed.
   * If the post is being claimed by fellow of other user, that fellow/user's id is added to the 'resolvedby' column of post.
   * @param {object} req request object
   * @param {object} res response object
   * @param {function} next sends req and res to next middleware
   */
  changeStatus(req, res, next) {
    if (Object.keys(req.body).length === 4) {
      if (req.body.role === 2) {
        db.one("UPDATE posts SET status=$1, helper_id=$2 WHERE post_id=$3 RETURNING *", [req.body.status + 1, req.body.user_id, req.body.post_id])
          .then(data => {
            res.locals.data = data;
            console.log('reach data', data)
            next();
          })
          .catch(err => {
            // console.log(err,'reach here')
            next(err);
          })
      } else {
        res.status(400).send('Invalid status change');
      }
    }
  }
}