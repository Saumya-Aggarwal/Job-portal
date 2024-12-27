const isRecruiter = async (req, res, next) => {
  try {
    const userId = req.user;
    const user = await UserModel.findOne(userId);
    if (user.role !== "recruiter") {
      return res.status(401).json({
        message: "Invalid Role",
        success: false,
      });
    }
    next();
  } catch (e) {
    return res.status(401).json({
      message: "Internal server error",
      success: false,
      error: e.message,
    });
  }
};

export default isRecruiter;
