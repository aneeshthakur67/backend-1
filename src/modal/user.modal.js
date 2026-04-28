import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/apiError.js";

let userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    refreshToken: String,
    image: [
      {
        url: String,
        public_id: String,
        title: String,
      },
    ],
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;

  try {
    let hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
  } catch (error) {
    throw new ApiError(500, "Error hashing password");
  }
});

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "4h" },
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" },
  );
};

export let User = mongoose.model("users", userSchema);
