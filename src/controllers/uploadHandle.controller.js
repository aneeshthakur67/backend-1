import uploadOnCloudinary from "../utils/coudinaryUpload.js";
import { User } from "../modal/user.modal.js";
import bcrypt from "bcrypt";
import { asyncHandler } from "../utils/asyncHandle.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
let uploadHandle = async (req, res) => {
  let path = req.file.path;
  let actualPath = path.replaceAll("\\", "/");
  let imageurl = await uploadOnCloudinary(actualPath);
  let user = await User.findById(req.user._id);
  user.image.push({
    url: imageurl.url,
    public_id: imageurl.public_id,
    title: req.body.title,
  });
  await user.save();
  res.json({
    status: 201,
    message: "Image uploaded successfully",
  });
};

export const getUserGallery = async (req, res) => {
  res.status(200).json(new ApiResponse(200, req.user, "user existed"));
};

let createToken = async (id) => {
  let user = await User.findById(id);

  let accessToken = await user.generateAccessToken();
  let refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;

  user.save();
  return { refreshToken, accessToken };
};

let loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Validate fields
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  if (!email.trim() || !password.trim()) {
    throw new ApiError(400, "Fields cannot be empty");
  }

  // Check if user exists
  const existed = await User.findOne({ email });
  if (!existed) throw new ApiError(404, "User not found");
  // Verify password
  const checkPassword = await bcrypt.compare(password, existed.password);
  if (!checkPassword) throw new ApiError(401, "Invalid password");
  // Get user without password
  const user = await User.findById(existed._id).select("-password");

  // Generate tokens
  const { refreshToken, accessToken } = await createToken(user._id);
  const options = {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  };

  res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .status(200)
    .json(new ApiResponse(200, user, "Login success"));
};

let registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!(name && email && password)) throw new Error("enter all fields");
  let existedUser = await User.findOne({ email });
  console.log(email);
  if (existedUser) throw new Error("User already existed");

  console.log("this is the updated pass:", password);

  let newUser = await User.create({
    name,
    email,
    password,
  });

  if (!newUser) throw new Error("Registraion failed");

  return res.json({
    success: true,
    statusCode: 201,
    data: newUser,
  });
};
export { uploadHandle, registerUser, loginUser };
