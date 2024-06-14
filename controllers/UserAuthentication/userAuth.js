const user =  require('../../modals/User/User');
const SecreteKey = process.env.SECRATE_KEY;
function generateToken(user) {
    const payload = {
      ...user,
    }
    return jwt.sign(payload, SecreteKey);
  }
exports.RegisterUser =async(req,res)=>{
    try { console.log(SecreteKey)
        // Generate salt
        bcrypt.genSalt(10, async (err, salt) => {
          if (err) {
            return res.status(500).json({ error: 'Error generating salt' });
          }
    
          // Hash the password
          bcrypt.hash(req.body.password, salt, async (err, hash) => {
            if (err) {
              return res.status(500).json({ error: 'Error hashing password' });
            }
  
            // Create user data
            const userData = {
              name: req.body.name,
              email: req.body.email,
              password: hash,
              deviceTokens: [req.body.deviceToken]
            };
    
            // Check if user exists
            const existingUser = await user.findOne({ email: userData.email });
            if (!existingUser) {
              const resp = await user.create(userData);
    
              const token = generateToken({ userId: resp._id });
              res.status(201).json({ token, userId: resp._id });
            } else {
              const passwordMatch = await bcrypt.compare(req.body.password, existingUser.password);
              if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
              }
    
              // Generate JWT token
              const token = generateToken({ userId: existingUser._id });
    
              res.status(201).json({ token, userId: existingUser._id });
            }
          });
        });
      } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
};


exports.LoginUser = async(req,res)=>{ 
    try {
        const existingUser = await user.findOne({ email: req.body.email });
        if (!existingUser) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        const passwordMatch = await bcrypt.compare(req.body.password, existingUser.password);
        if (!passwordMatch) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
    
        const newDeviceToken = req.body.deviceToken;
    
        // Update the user document with the new device token
        await user.findOneAndUpdate(
          { email: req.body.email },
          { $addToSet: { deviceTokens: newDeviceToken } }, // Add new device token to the array
          { new: true }
        );
    
        const token = generateToken({ userId: existingUser._id });
        res.status(200).json({ token, userId: existingUser._id });
      } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
};