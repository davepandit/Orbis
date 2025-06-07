import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Admin", "User"],
      default: "User",
    },
    status: {
      type: String,
      enum: ["banned", "active", "pending"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// match password while login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// hash the password before saving to the db
userSchema.pre("save", async function (next) {
  if (!this.password) {
    next();
  }

  // generate a salt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
