import RoleDetails from "../models/roleModel.js";

const createRole = async (req, res) => {
  try {
    const { name,status } = req.body;
    const newCreateRole = new RoleDetails({ name,status });
    const savedRoles = await newCreateRole.save();
    res.status(201).json({ success: true, data: savedRoles });
  } catch (error) {
    // console.error(" Error creating project:", error);

    if (error.name === "ValidationError") {
      const errors = {};
      for (let field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ success: false, errors });
    }
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

const getRoles= async (req, res) => {
  try {
    const Roles = await RoleDetails.find();
    res.status(200).json({ success: true, data: Roles });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const editRoles = async (req, res) => {
  try {
    const { id } = req.params;
     const updated = await RoleDetails.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ success: false, message: "Role not found" });
    }
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteRoles = async (req, res) => {
  const {id} = req.params;
  try {
    const deleteRoles = await RoleDetails.findByIdAndDelete(id);
    if (!deleteRoles) {
      return res.status(404).json({ success: false, message: "Role not found" });
    }
    res.status(200).json({ success: true, message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export { createRole, getRoles, editRoles, deleteRoles };