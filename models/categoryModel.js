import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    type:{
        type: String,
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
const Category = mongoose.model("category", categorySchema);
export default Category;