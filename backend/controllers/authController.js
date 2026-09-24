import User from "../models/User.js";
import MenteeProfile from "../models/MenteeProfile.js";
import MentorProfile from "../models/MentorProfile.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, phoneNo, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNo,
      role,
    });

    // ROLE-SPECIFIC PROFILE CREATION
    if (role === "mentee") {
      const { universityRollNo, department, section } = req.body;
      await MenteeProfile.create({
        userId: user._id,
        universityRollNo,
        department,
        section,
      });
    }

    if (role === "mentor") {
      const { department, menteeIds } = req.body;
      await MentorProfile.create({
        userId: user._id,
        department,
        menteeIds:[],
      });
    }

    if (role === "admin") {
      if (req.body.adminSecret !== process.env.ADMIN_SECRET) {
        return res.status(403).json({ msg: "Invalid admin secret" });
      }
    }

    res.status(201).json({
      token: generateToken(user._id, user.role),
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    res.json({
      token: generateToken(user._id, user.role),
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  res.json({ success: true, message: "Logged out successfully" });
};
