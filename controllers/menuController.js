import Menu from "../models/menuModel.js";

const createMenu = async (req, res) => {
  try {
    const dataToCreate = { ...req.body };
    if (req.file) {
      dataToCreate.itemImage = req.file.filename;
    }

    const MenuDetails = new Menu(dataToCreate);
    await MenuDetails.save();
    res.status(201).json({
      success: true,
      message: "Menu created successfully",
      data: MenuDetails,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMenu = async (req, res) => {
  try {
    const MenuDetails = await Menu.find();
    const updatedMenuDetails = MenuDetails.map((menu) => {
      if (menu.itemImage) {
        menu.itemImage = `uploads/others/${menu.itemImage}`;
      }
      return menu;
    });
    res.status(200).json({
      success: true,
      data: updatedMenuDetails,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const dataToUpdate = { ...req.body };
    if (req.file) {
      dataToUpdate.itemImage = req.file.filename;
    }

    const updatedMenuDetails = await Menu.findByIdAndUpdate(id, dataToUpdate, {
      new: true,
      runValidators: true,
    });
    if (!updatedMenuDetails) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.status(200).json({
      success: true,
      message: "Menu updated successfully",
      data: updatedMenuDetails,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedMenuDetails = await Menu.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedMenuDetails) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.status(200).json({
      success: true,
      message: "Menu status updated successfully",
      data: updatedMenuDetails,
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
    res
      .status(200)
      .json({ success: true, message: "Menu deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMenuByCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const MenuDetails = await Menu.find({ category: id, status: "true" });
    const updatedMenuDetails = MenuDetails.map((menu) => {
      if (menu.itemImage) {
        menu.itemImage = `uploads/others/${menu.itemImage}`;
      }
      return menu;
    });

    res.status(200).json({
      success: true,
      data: updatedMenuDetails,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createMenu,
  getMenu,
  updateMenu,
  updateStatus,
  deleteMenu,
  getMenuByCategory,
};
