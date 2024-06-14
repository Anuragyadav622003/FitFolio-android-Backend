const Feedback  = require('../../modals/FeedBack/feedBack');
exports.createFeedback= async(req,res)=>{
    try {
        const response = await user.findOne({_id:req.user});
       const image  = response.profileImage;
     const update = await Feedback.find({ userId: req.user });
     if (update.length > 0) {
       await Feedback.deleteMany({ userId: req.user });
     }
     const Name = await user.find({ _id: req.user });
     const newDate = new Date().toDateString().split(' ');
     const data = {
       usability: req.body.usability,
       features: req.body.features,
       satisfaction: req.body.satisfaction,
       bugReport: req.body.bugReport,
       suggestions: req.body.suggestions,
       userId: req.user,
       name: Name[0].name,
       date:`${newDate[2]} ${newDate[1]} ${newDate[3]}`,
       profileImage:image
   
   
     }
   
      await Feedback.insertMany(data);
     res.status(201).send("");
   } catch (error) {
       console.log(error);
       res.status(500).send('')
   }
};


exports.getFeedback = async(req,res)=>{ 
    const response = await Feedback.find({});
    const userId = req.user;
  
    res.send({ response, userId });
};