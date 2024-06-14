const userCart = require('../../modals/CartModal/cartModal');
exports.createUserCart = async(req,res)=>{ 
    try {
        const existingItem = await userCart.findOne({
          name: req.body.name,
          userId: req.user,
          price: req.body.price,
          expectedPrice: req.body.expectedPrice,
          category: req.body.category,
          img: req.body.img,
        });
    
        if (existingItem) {
          // If the item already exists, update the quantity
          await userCart.updateOne(
            { _id: existingItem._id },
            { $inc: { quantity: 1 } } // Increment quantity by 1
          );
    
          const updatedItem = await userCart.findById(existingItem._id);
          res.status(200).json(updatedItem);
        } else {
          // If the item doesn't exist, insert a new item
          const data = {
            name: req.body.name,
            price: req.body.price,
            expectedPrice: req.body.expectedPrice,
            category: req.body.category,
            img: req.body.img,
            quantity: 1,
            userId: req.user
          };
    
          const newItem = await userCart.insertMany(data);
          res.status(201).json(newItem);
        }
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    
};

exports.getUserCart = async(req,res)=>{ 
    const data = await userCart.find({ userId: req.user });
    res.status(201).json(data);
};
exports.deleteUserCart = async(req,res)=>{
    try {
        // Extract the item ID from the request parameters
    
    
        const itemId = req.params.id;
        console.log(req.query.userId + " " + itemId);
        // Use mongoose to find and delete the cart item by user ID and item ID
        const deletedItem = await userCart.deleteMany({ _id: itemId, userId: req.user });
        // Use mongoose to find and delete the cart item by ID
    
    
        if (!deletedItem) {
          // If the item with the provided ID doesn't exist, return 404 Not Found
          return res.status(404).json({ error: 'Cart item not found' });
        }
    
        // Return a success message or the deleted item
        res.status(200).json({ message: 'Cart item deleted successfully' });
      } catch (error) {
        // If an error occurs, return a 500 Internal Server Error
        console.error('Error deleting cart item:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};