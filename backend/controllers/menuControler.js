import menuModel from "../models/menuModel.js";
import fs from 'fs';

const addMenu = async (req, res) => {

    let image_filename = req.file.filename;

    const menu = new  menuModel({
       menu_name:req.body.menu_name,
       menu_image:image_filename
    })
    try {
        await menu.save()
        res.json({ success: true, messge: "Menu Added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'error' })
    }

}

// list all menu items

const listMenu = async (req, res) => {
    try {
        const menu = await menuModel.find();
        res.json({ success: true, data: menu })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'error' });
    }
}

// remove a menu

const specificMenuRemove  = async (req,res) => {
    try {
        // Support both query and params for id
        let id = req.params.id || req.query.id;
        if (!id) {
            return res.status(400).json({ success: false, message: 'No Menu id provided' });
        }
        const menu =  await foodModel.findById(id);
        if (menu && menu.menu_image) {
            try {
                await fs.promises.unlink(`uploads/${menu.menu_image}`);
                console.log('The image was deleted');
            } catch (err) {
                console.log('Error deleting image:', err);
            }
        }
        await menuModel.findByIdAndDelete(id);
        res.json({success:true, message:'The data will be removed from Database'});
    } catch (error) {
        res.json({success:false, message:error.message || 'Failed to remove the data'});
    }
}


export {addMenu , listMenu , specificMenuRemove};