import mongoose from "mongoose";
const settingsSchema = new mongoose.Schema(
  {
    hotelId: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    companyName:{
      type:String
    },
    gst:{
      type:String
    },
    gstPercentage:{
      type:String
    },
    address:{
      type:String
    },
    city:{
      type:String
    },
    state:{
      type:String
    },
    pincode:{
      type:String
    },
    discount:{
      type:String
    },
    
  },
  {
    timestamps: true,
  }
);
const Settings = mongoose.model("Settings", settingsSchema);
export default Settings;
