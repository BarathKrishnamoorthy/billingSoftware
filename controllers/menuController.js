import Menu from "../models/menuModel.js";

const createMenu = async (req, res) => {
    try {
        const MenuDetails = new Menu(req.body);
        await MenuDetails.save();
        res.status(201).json({
            success: true,
            message: "Menu created successfully",
            data: MenuDetails
        })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getMenu = async (req, res) => {
    try {
        const MenuDetails = await Menu.find();
        res.status(200).json({
            success: true,
            data: MenuDetails
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMenuDetails = await Menu.findByIdAndUpdate(id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedMenuDetails) {
            return res.status(404).json({ message: "Menu not found" });
        }
        res.status(200).json({
            success: true,
            message: "Menu updated successfully",
            data: updatedMenuDetails
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const deleteMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMenuDetails = await Menu.findByIdAndDelete(id);
        if (!deletedMenuDetails) {
            return res.status(404).json({ message: "Menu not found" });
        }
        res.status(200).json({success:true, message: "Menu deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMenuByHotel = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const MenuDetails = await Menu.find({ hotelId });
        res.status(200).json({
            success: true,
            data: MenuDetails
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    createMenu,
    getMenu,
    updateMenu,
    deleteMenu,
    getMenuByHotel
};