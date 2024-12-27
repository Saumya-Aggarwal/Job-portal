import CompanyModel from "../models/company.model";

export const registerCompany = async (req, res) => {
  try {
    const userId = req.user;
    const { name, website, description, location, logo } = req.body;
    const Exist = await CompanyModel.findOne({ userId, name });
    if (Exist) {
      return res.status(401).json({
        message: "Company already exists",
        success: false,
        company: Exist,
      });
    }
    const company = await CompanyModel.create({
      name,
      website,
      description,
      location,
      logo,
      userId,
    });
    if (!company) {
      return res.status(401).json({
        message: "Cannot create Company",
        success: false,
      });
    }
    return res.status(201).json({
      message: "company created",
      success: true,
    });
  } catch (e) {
    return res.status(400).json({
      message: "Internal server error",
      success: false,
      error: e.message,
    });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const userId = req.user;
    const companies = await CompanyModel.find({
      userId,
    });
    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(201).json({
      companies,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Internal server error",
      success: false,
      error: e.message,
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await CompanyModel.findById({
      companyId,
    });
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Internal server error",
      success: false,
      error: e.message,
    });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await CompanyModel.findByIdAndDelete({
      companyId,
    });
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company deleted : " + company,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Internal server error",
      success: false,
      error: e.message,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const userId = req.user;
    const companyId = req.params.id;
    const updatedData = req.body;
    const updatedCompany = await CompanyModel.findByIdAndUpdate(
      companyId,
      updatedData,
      { new: true, runValidators: true }
    );
    if (!updateCompany) {
        return res
          .status(404)
          .json({ success: false, message: "company not found " });
      }
      res.status(200).json({ success: true, updateCompany });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error });
    }
  };
  
