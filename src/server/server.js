// initialize connection with PostgreSQL database
const express = require ('express');
const app = express();
const userController = require('./controller/userController');
const postController = require('./controller/postController');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Methods ", "GET, POST,HEAD, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/createuser', userController.createUser, (req, res) => {
  
  res.status(200).json(res.locals.data);
});

app.post('/login', userController.verifyUser, (req, res) => {
  res.status(200).json(res.locals.data);
});

app.post('/createpost', 
  postController.createPost, 
  (req, res) => {
    res.status(200).json(res.locals.data);
});
app.get('/home', 
  postController.getPosts, 
  (req, res) => {
    res.status(200).json(res.locals.data);
});
app.patch('/status', 
  postController.changeStatus, 
  (req, res) => {
    res.status(200).json(res.locals.data);
});
app.use(express.static(__dirname + '/../../dist'));

app.use((err, req, res, next) => {
  res.status(400).send(err);
});

//this needs to be exported to userController.test in order to run tests
module.exports = app.listen(3000, () => {
  console.log('Listening on port 3000...');
} );



