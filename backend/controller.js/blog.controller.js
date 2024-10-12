import bcryptjs from "bcryptjs";
import fs from "fs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookies } from "../utils/generateTokenAndSetCookies.js";
import { Post } from "../models/post.model.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All fields required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, error: "User  already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      name,
    });

    await user.save();

    generateTokenAndSetCookies(res, user._id);

    return res.status(201).json({
      success: true,
      message: "User  created successfully.",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All fields required!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User  not found." });
    }

    const checkPass = await bcryptjs.compare(password, user.password);
    if (!checkPass) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });
    }

    generateTokenAndSetCookies(res, user._id);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const createPost = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: "No file uploaded" });
  }

  const parts = req.file.originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = req.file.path + "." + ext;
  fs.renameSync(req.file.path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
    if (err) {
      throw err;
    }
    const { title, summary, content } = req.body;
    const postDoc = new Post({
      title,
      summary,
      content,
      cover: newPath,
    });
    postDoc.save();
    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      postDoc: {
        ...postDoc._doc,
      },
    });
  });
};

export const getPost = async (req,res) => {
  return res.json(
    await Post.find()
              .sort({createdAt: -1})
              .limit(10)
  )
};

export const getSinglePost = async (req,res) => {
  const {id} = req.params;
  const doc = await Post.findById(id)
  res.json(doc);
};

export const editPost = async (req, res) => {
  try {
    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const ext = originalname.split('.').pop();
      newPath = `${path}.${ext}`;
      fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, info) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }

      const { id, title, summary, content } = req.body;
      console.log(req.body.id)
      const postDoc = await Post.findById(id);
      if (!postDoc) {
        return res.status(404).json({ message: 'Post not found' });
      }

      postDoc.title = title;
      postDoc.summary = summary;
      postDoc.content = content;
      postDoc.cover = newPath || postDoc.cover; 

      await postDoc.save(); 

      return res.json(postDoc);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
      const postDoc = await Post.findById(id);
      if (!postDoc) {
          return res.status(404).json({ message: 'Post not found' });
      }

      await Post.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
};