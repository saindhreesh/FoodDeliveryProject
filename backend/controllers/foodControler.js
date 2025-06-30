import foodModel from "../models/foodModel.js";
import fs from 'fs';



// add food item 

const addFood = async (req, res) => {

    let image_filename = req.file.filename;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category,
    })
    try {
        await food.save()
        res.json({ success: true, messge: "Food Added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'error' })
    }

}

// list all Foods

const listFood = async (req, res) => {
    try {
        const food = await foodModel.find();
        res.json({ success: true, data: food })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'error' });
    }
}
// Remove a specific food 

const specificFoodRemove  = async (req,res) => {
    try {
        // Support both query and params for id
        let id = req.params.id || req.query.id;
        if (!id) {
            return res.status(400).json({ success: false, message: 'No food id provided' });
        }
        const food =  await foodModel.findById(id);
        if (food && food.image) {
            try {
                await fs.promises.unlink(`uploads/${food.image}`);
                console.log('The image was deleted');
            } catch (err) {
                console.log('Error deleting image:', err);
            }
        }
        await foodModel.findByIdAndDelete(id);
        res.json({success:true, message:'The data will be removed from Database'});
    } catch (error) {
        res.json({success:false, message:error.message || 'Failed to remove the data'});
    }
}

// Update a Specific Food

// const specificFoodUpdate = async (req, res) => {
//     try {
//         const food = await foodModel.findById(req.params.id);
//         if (food) {
//             try {
//                 await foodModel.findByIdAndUpdate(req.params.id, {
//                     name:req.body.name,
//                     description:req.body.description,
//                     price:req.body.price,
//                     category:req.body.category,
//                     image:req.body.image
//                 }, { new: true })
//                 res.json({ success: true, message: 'The Product will be update' })
//             } catch (err) {
//                 console.log('Error Updating Images:', err)
//             }
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

export { addFood, listFood, specificFoodRemove };
