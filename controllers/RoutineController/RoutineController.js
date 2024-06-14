const activity = require('../../modals/Routine/Routine');

// Controller to create a new user schedule entry
exports.createUserSchedule = async (req, res) => {
  
        try {
            const {activities} = req.body;
          const updateData = {};
      
          // Map the activities to the update data format
          activities.forEach(activity => {
            updateData[`${activity.activity}.time`] = activity.time;
          });
     
          // Perform upsert operation
          const result = await activity.findOneAndUpdate(
            { user_id: req.user }, // Filter
            { $set: updateData }, // Update data
            { new: true, upsert: true } // Options: return the updated document and perform upsert
          );
      
          
          return res.status(201).json(result);
        } catch (error) {
          console.error('Error upserting activities:', error);
          throw error;
        }
      };
      
// Controller to get user schedule by user ID
exports.getUserSchedule = async (req, res) => {
  try {
    const  user_id  = req.user;

    // Find user schedule by user ID
    const userSchedule = await activity.findOne({ user_id });

    if (!userSchedule) {
      return res.status(404).json({ message: 'User schedule not found' });
    }

    res.status(200).json(userSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

