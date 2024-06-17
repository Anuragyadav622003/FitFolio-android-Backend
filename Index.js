const express = require('express');
const schedule = require('node-schedule');
require('dotenv').config();
const admin = require('firebase-admin');
const cors = require('cors');
const mongoose = require("mongoose");


const waterIntakeController = require('./controllers/trackerController/waterIntakeController');
const workoutTrackerController = require('./controllers/trackerController/workoutTrackerController');
const userDetailsController = require('./controllers/user/userDetailsController');
const userProfile = require('./controllers/user/profile');
const leaderBoard = require("./controllers/leaderBoard/leaderBoardController");
const todoListController  = require('./controllers/TodoList/todolistController');
const routine = require('./controllers/RoutineController/RoutineController');
const feedbackController = require('./controllers/Feedback/FeedBackController');
const cartController = require('./controllers/CartController/CartController');
const storeProductController = require('./controllers/StoreProduct/storeProductController');
const caloriesBurnedToday = require('./controllers/trackerController/caloriesBurn')
const userAuth = require('./controllers/UserAuthentication/userAuth');
const verifyToken = require('./midleware/verifyToken');
const SecreteKey = process.env.SECRATE_KEY;
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.error('MongoDB Atlas connection error:', err));


const app = express();
// CORS stands for Cross-Origin Resource Sharing is primarily used to enable secure communication between different origins (domains) in a web browser.
//Cross-Site Request Forgery (CSRF) attacks.
app.use(cors());
// Middleware to parse JSON bodies.Extraxt meaningfull messase
app.use(express.json());
//The express.urlencoded() middleware in Express.js is used to parse incoming request bodies encoded using the application/x-www-form-urlencoded format. This format is commonly used when submitting HTML forms.
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const Port = process.env.PORT || 3000;

app.get("/api",(req,res)=>{ 
  res.send("hello");
})
app.post("/api/waterIntake", verifyToken,waterIntakeController.createWaterIntake);
app.get("/api/waterIntake", verifyToken,waterIntakeController.getWaterIntakeByUser);

app.post("/api/workout", verifyToken,workoutTrackerController.createWorkout);
app.get("/api/workout", verifyToken,workoutTrackerController.getWorkoutByUser);
app.get('/api/getCaloriesBurnedToday',verifyToken,caloriesBurnedToday.totalCaloriesBurnToday);


app.post("/api/userProfile",verifyToken,userProfile.createProfile);
app.get('/api/userProfile',verifyToken,userProfile.getProfile);
app.get('/api/getUserId',verifyToken,(req,res)=>{ res.status(201).json(req.user)});
app.post('/api/userDetails',verifyToken,userDetailsController.createUserDetails);
app.get('/api/userDetails',verifyToken,userDetailsController.getAllUserDetails);

app.get('/api/leaderbord',verifyToken,leaderBoard.createLeaderBoard);


app.post('/api/routine',verifyToken,routine.createUserSchedule);
app.get('/api/routine',verifyToken,routine.getUserSchedule);


app.get('/api/products', verifyToken,storeProductController.getStoreProduct );

app.post('/api/feedback', verifyToken,feedbackController.createFeedback );
app.get('/api/feedback', verifyToken,feedbackController.getFeedback);

app.post('/api/userCart', verifyToken, cartController.createUserCart);
app.get('/api/userCart', verifyToken,cartController.getUserCart );
app.delete('/api/userCart/:id', verifyToken, cartController.deleteUserCart);

app.post('/api/todos', verifyToken,todoListController.createTodo);
app.get('/api/todos', verifyToken,todoListController.getTodos);
app.delete('/api/todos', verifyToken,todoListController.deleteTodoList);






app.post('/api/login', userAuth.LoginUser);

app.post('/api/register',userAuth.RegisterUser)







app.listen(Port, () => {
  console.log(`listening on port ${Port}`);
})