import userModel from '../models/userModel.js';

// add items to user cart

const addToCart = async (req, res) => {
    try {
        const userId = req.body.userId || req.body.usedId;
        if (!userId) {
            return res.json({ success: false, message: 'User ID is required' });
        }
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: 'User not found' });
        }
        const cartData = userData.cartData || {};
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }
        else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: 'Added To Cart' })
    } catch (error) {
        res.json({ success: false, message: error.message || 'Error' })
    }
}

// const removeItems from userCart

const removerFromCart = async (req, res) => {
    try {
        const userId = req.body.userId || req.body.usedId;
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: 'Removed From Cart' })
    } catch (error) {
        res.json({ succes: false, message: 'Error' })
    }
}
// fetchUser Cart Data

const getCart = async (req, res) => {
    try {
        const userId = req.body.userId || req.body.usedId;
        const userData = await userModel.findById(userId);
        const cartData = userData.cartData
        res.json({success:true,cartData})

    } catch (error) {
        res.json({success:false ,message:"Error"})
    }
}
export { addToCart, removerFromCart, getCart };