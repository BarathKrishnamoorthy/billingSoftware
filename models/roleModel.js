import mongoose from "mongoose";
const roleSchema = new mongoose.Schema(
  {
    name: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Employee"
    },
    status:{
      type:String
    },
  },
  {
    timestamps: true,
  }
);



const Roles = mongoose.model("role", roleSchema);
export default Roles;
