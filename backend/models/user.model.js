import mongoose, { mongo } from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ["applicant", "recruiter"],
      required: true,
    },
    profile: {
      bio: {
        type: String,
      },
      skills: [{ type: String }],
      resume: { type: String },
      resumeOriginalName: { type: String },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      Image: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);
// Pre-save middleware to handle the skills input
userSchema.pre("save", function (next) {
  if (typeof this.profile.skills === "string") {
    this.profile.skills = this.profile.skills
      .split(",")
      .map((skill) => skill.trim());
  }
  next();
});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
