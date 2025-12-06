import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/UsersModel.js";

const loginHotel = async (req, res) => {
  try {
    const { email, password } = req.body;
    
  
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Email and password are required" 
      });
    }


    const user = await User.findOne({ email }).populate("role");
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid password" 
      });
    }


    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email,
        role: user.role 
      }, 
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );


    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: userWithoutPassword
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: error.message 
    });
  }
};

const createHotel = async (req, res) => {
  try {
    const { email, password } = req.body;
    

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "Email already exists" 
      });
    }

    if (!req.body.companyId && req.body.dateOfJoining) {
      const customFormat = await generateCustomId(req.body.dateOfJoining);
      req.body.companyId = customFormat;
    }


    const newHotel = new User(req.body);
    await newHotel.save();

    const hotelWithoutPassword = { ...newHotel._doc };
    delete hotelWithoutPassword.password;

    res.status(201).json({ 
      success: true, 
      message: "Hotel created successfully", 
      data: hotelWithoutPassword 
    });

  } catch (error) {
    console.error("Create hotel error:", error);
    
    if (error.name === "ValidationError") {
      const errors = {};
      Object.keys(error.errors).forEach(field => {
        errors[field] = error.errors[field].message;
      });
      return res.status(400).json({ 
        success: false, 
        errors 
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error",
      error: error.message 
    });
  }
};

const editHotel = async (req, res) => {
  try {
    const { id } = req.params;
    

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updated = await User.findByIdAndUpdate(
      id, 
      req.body, 
      { 
        new: true,
        runValidators: true 
      }
    ).select("-password");
    
    if (!updated) {
      return res.status(404).json({ 
        success: false, 
        message: "Hotel not found" 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: "Hotel updated successfully",
      data: updated 
    });
  } catch (error) {
    console.error("Edit hotel error:", error);
    
    if (error.name === "ValidationError") {
      const errors = {};
      Object.keys(error.errors).forEach(field => {
        errors[field] = error.errors[field].message;
      });
      return res.status(400).json({ 
        success: false, 
        errors 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error",
      error: error.message 
    });
  }
};

const deleteHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHotel = await User.findByIdAndDelete(id);
    
    if (!deletedHotel) {
      return res.status(404).json({ 
        success: false, 
        message: "Hotel not found" 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: "Hotel deleted successfully" 
    });
  } catch (error) {
    console.error("Delete hotel error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error",
      error: error.message 
    });
  }
}

const generateEmployeeId = async (req, res) => {
  try {
    const { dateOfJoining } = req.body;

    if (!dateOfJoining) {
      return res.status(400).json({ 
        success: false,
        message: "Date is required in YYYY-MM-DD format" 
      });
    }

    const parsedDate = new Date(dateOfJoining);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid date format" 
      });
    }

    const yy = parsedDate.getFullYear().toString().slice(2);
    const mm = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const dd = String(parsedDate.getDate()).padStart(2, "0");
    
    const countEmployee = await User.countDocuments();
    const customFormat = `HOTEL${yy}${mm}${dd}${countEmployee + 1}`;

    res.status(200).json({ 
      success: true, 
      employeeId: customFormat 
    });
  } catch (error) {
    console.error("Generate employee ID error:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal Server Error",
      error: error.message 
    });
  }
};

const generateCustomId = async () => {
  const countEmployee = await User.countDocuments();
  const increment = String(countEmployee + 1).padStart(3, "0");
  return `HOTEL${increment}`;
};


export {
  loginHotel,
  createHotel,
  editHotel,
  deleteHotel,
  generateEmployeeId
};