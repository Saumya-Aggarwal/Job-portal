import JobModel from "../models/job.model.js";
import ApplicationModel from "../models/application.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.user; // Ensure you are extracting the userId correctly
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job ID needed",
        success: false,
      });
    }

    const job = await JobModel.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    const duplicateApplication = await ApplicationModel.findOne({
      applicant: userId,
      job: jobId,
    });
    if (duplicateApplication) {
      return res
        .status(400)
        .json({ message: "Cannot apply again", success: false });
    }
    const application = await ApplicationModel.create({
      job: jobId,
      applicant: userId,
    });

    if (!application) {
      return res.status(500).json({
        message: "Application not created",
        success: false,
      });
    }

    job.applications.push(application._id); // Push application ID to the specific job instance
    await job.save(); // Save the updated job instance

    return res.status(201).json({
      message: "Job applied successfully",
      success: true,
      application,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
export const getAppliedJob = async (req, res) => {
  try {
    const userId = req.user;
    const applications = await ApplicationModel.find({
      applicant: userId,
    }).populate({
      path: "job",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "company",
        options: { sort: { createdAt: -1 } },
      },
    });

    if (!applications || applications.length === 0) {
      return res.status(404).json({
        message: "No Jobs Applied",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      applications,
      jobs: applications.map((application) => application.job),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
export const getApplicants = async (req, res) => {
  try {
    const userId = req.user;
    const jobId = req.params.id;

    const applications = await ApplicationModel.find({ job: jobId })
      .populate("applicant")
      .populate("job");

    if (!applications || applications.length === 0) {
      return res.status(404).json({
        message: "No Applicants",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      job: applications[0].job,
      applicants: applications.map((application) => application.applicant),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
//! Another method for getApplicants
/*export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await JobModel.findById(jobId)
      .populate({
        path: 'applications',
        populate: {
          path: 'applicant',
        }
      });

    if (!job || !job.applications || job.applications.length === 0) {
      return res.status(404).json({
        message: "No Applicants",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      job,
      applicants: job.applications.map((application) => application.applicant),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
}; */
export const updateStatus = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;
    const statusOptions = ["pending", "accepted", "rejected"];
    if (!statusOptions.includes(status.toLowerCase())) {
      return res.status(400).json({
        message: "Invalid status",
        success: false,
      });
    }
    const application = await ApplicationModel.findById(applicationId);
    if (!application) {
      return res
        .status(404)
        .json({ message: "Application not found", success: false });
    }
    application.status = status;
    await application.save();
    return res.status(200).json({
      message: "Application status updated successfully",
      success: true,
      application,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
