const { response } = require('express');
const WorkoutTracker = require('../../modals/Tracker/workoutTracker');
const getTodayDate = () => {
    const today = new Date();
    today.setHours(5,30, 0, 0);
   
    const datePart = today.toISOString().split('T')[0];

    return datePart;
  };
exports.totalCaloriesBurnToday = async(req,res)=>{ 
      try { const today = getTodayDate();
      
     console.log(today,"today")
     
            const response = await WorkoutTracker.find({userId:req.user,date:today});
            console.log(response);
            res.status(201);
      } catch (error) {
        res.status(500);
      }

};