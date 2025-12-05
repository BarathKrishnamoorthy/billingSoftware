import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    OwnerName: {
      type: String,
    },
    CompanyName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roles"
    },
    dateOfJoining: { 
      type: Date 
    },
    companyId: {
      type: String,
    },
    status: { 
      type: String, 
      default: "1" 
    },
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});


userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ phoneNumber: 1 });
userSchema.index({ companyId: 1 });

const User = mongoose.model("User", userSchema);
export default User;