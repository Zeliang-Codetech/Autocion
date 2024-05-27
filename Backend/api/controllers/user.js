import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import "dotenv/config";

export const createUser = async (req, res, next) => {
  try {
    const { fullname, email, phone, password, role } = req.body;
    if (!fullname || !email || !phone || !password) {
      return next(new ErrorHandler("Please add all fields", 400));
    }

    const validate = await User.find({
      $or: [{ email: email }, { phone: phone }],
    });
    if (validate.length === 0) {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        fullname: fullname,
        email: email,
        phone: phone,
        password: hashPassword,
        role: role,
      });
      if (user) {
        res.status(200).json({ status: 1, message: "Account created.", user });
      }
    } else {
      res.status(400).json({
        status: 0,
        message: "User already exist, please Login to continue.",
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ status: 0, message: "Error", error });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const user = req.body;
    const users = await User.find(user);
    if (user) {
      res
        .status(200)
        .json({ status: 1, success: true, message: "Users list", users });
    } else {
      res
        .status(400)
        .json({ status: 0, success: false, message: "No users found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: "Error", error });
  }
};

export const getUserbyId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
      return next(new ErrorHandler("Invalid Id", 400));
    }
    const { userOrders } = req;
    // Fetched orders are available in req.userOrders from middleware
    const { userCart } = req;
    // Fetched orders are available in req.userCart from middleware

    res.status(200).json({
      status: 1,
      success: true,
      message: `Hello ${user.fullname}`,
      user,
      orders: userOrders,
      cart: userCart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: "Error", error });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const singleUser = await User.findOne(req.user._id);
    if (!singleUser) {
      res.json({ status: 0, message: "User not found" });
      return;
    }
    res.json({ status: 1, response: singleUser });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteUser = await User.findByIdAndDelete(id);
    if (deleteUser) {
      return res.status(200).json({
        success: true,
        message: "Account deleted.",
      });
    }
    return next(new ErrorHandler("Invalid Id", 400));
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: "Error", error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const checkUser = await User.findOne({
      phone: phone,
    });

    if (checkUser) {
      const isMatched = await bcrypt.compare(password, checkUser.password);

      if (isMatched) {
        let token = jwt.sign(
          { fullname: checkUser.fullname, _id: checkUser._id },
          process.env.SECRET
        );
        const options = {
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        res
          .cookie("token", token, options)
          .status(201)
          .json({
            status: 1,
            success: true,
            message: "Login successful",
            token: token,
            user: {
              _id: checkUser._id,
              fullname: checkUser.fullname,
              email: checkUser.email,
              image: checkUser.image,
              phone: checkUser.phone,
              role: checkUser.role,
            },
          });
      } else {
        res
          .status(401)
          .json({ status: 0, success: false, message: "Incorrect password" });
      }
    } else {
      res
        .status(401)
        .json({ status: 0, success: false, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: "Error", error });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const {
      fullname,
      email,
      phone,

      role,
      alternatePhone,
      addressName,
      pincode,
      houseNo,
      area,
      landmark,
      city,
      state,
    } = req.body;
    const image = req.file;
    const validateUser = await User.findById(id);
    if (!validateUser) {
      return next(new ErrorHandler("Invalid Id", 400));
    }
    let updateFields = {
      fullname,
      email,

      phone,
      role,
      address: {
        addressName,
        alternatePhone,
        pincode,
        houseNo,
        area,
        landmark,
        city,
        state,
      },
    };
    if (image) {
      updateFields.image = image.filename;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    if (updatedUser) {
      res.status(200).json({
        status: 1,
        success: true,
        message: "User details updated.",
        updatedUser,
      });
    } else {
      return next(new ErrorHandler("User details update failed.", 400));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, message: "Error", error });
  }
};

export const updatePassword = async (req, res) => {
  const id = req.params.id;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ status: 0, message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ status: 0, message: "Old password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      {
        new: true,
      }
    );

    if (updatedUser) {
      return res
        .status(200)
        .json({ status: 1, message: "Password updated successfully" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 0, message: "Error updating password", error });
  }
};
