import mongoose from "mongoose";
const menuSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category"
    },
   
    name: {
      type: String,
    },

    price:{
      type: String,
    },
  
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Menu = mongoose.model("menu", menuSchema);
export default Menu;