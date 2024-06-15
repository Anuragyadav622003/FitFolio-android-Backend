const activity = require('../../modals/Routine/Routine');

// Controller to create a new user schedule entry
exports.createUserSchedule = async (req, res) => {
  try {
    const { activities } = req.body;
    const userId = req.user;

    // Validate the request
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    if (!Array.isArray(activities) || activities.length === 0) {
      return res.status(400).json({ message: 'Activities are required' });
    }

    const updateData = {};

    // Map the activities to the update data format
    activities.forEach(activity => {
      if (activity.activity && activity.time) {
        updateData[`${activity.activity}.time`] = activity.time;
      }
    });

    // Perform upsert operation
    const result = await activity.findOneAndUpdate(
      { user_id: userId }, // Filter
      { $set: updateData }, // Update data
      { new: true, upsert: true } // Options: return the updated document and perform upsert
    );

    return res.status(201).json(result);
  } catch (error) {
    console.error('Error upserting activities:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Controller to get user schedule by user ID
exports.getUserSchedule = async (req, res) => {
  try {
    const userId = req.user;

    // Validate the request
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Find user schedule by user ID
    const userSchedule = await activity.findOne({ user_id: userId });
    

    return res.status(200).json(userSchedule);
  } catch (error) {
    console.error('Error fetching user schedule:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
