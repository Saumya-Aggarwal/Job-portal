import mongoose, { mongo } from "mongoose";
const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    logo: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  { timestamps: true }
);

const CompanyModel = mongoose.model("Company", companySchema);
export default CompanyModel;
