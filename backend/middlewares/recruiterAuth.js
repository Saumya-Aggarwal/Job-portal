import UserModel from "../models/user.model.js";

const isRecruiter = async (req, res, next) => {
  try {
    const userId = req.user; 
    const user = await UserModel.findById(userId);
    
    if (user && user.role === "recruiter") {
      return next(); // Exit early if the user is authorized
    }

    return res.status(403).json({ // Use 403 for forbidden access
      success: false,
      message: "Invalid Role",
    });
  } catch (error) {
    return res.status(500).json({ // Use status 500 for internal server error
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export default isRecruiter;
