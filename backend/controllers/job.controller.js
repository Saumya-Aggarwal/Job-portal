import JobModel from "../models/job.model.js";
//for admins
export const createJob = async (req, res) => {
  try {
    const userId = req.user;
    const {
      title,
      description,
      salary,
      requirements,
      location,
      jobType,
      position,
      company,
      experience,
    } = req.body;
    let formattedRequirements = requirements;
    if (typeof requirements === "string") {
      formattedRequirements = requirements
        .split(",")
        .map((requirement) => requirement.trim());
    }
    const job = await JobModel.find({ title, createdBy: userId, company });
    if (job && job.length !== 0) {
      return res.status(400).json({
        success: false,
        message: "Job already exists",
      });
    }
    const newJob = await JobModel.create({
      title,
      description,
      salary,
      requirements: formattedRequirements,
      location,
      jobType,
      position,
      company,
      createdBy: userId,
      experience,
    });

    if (!newJob) {
      return res.status(400).json({
        success: false,
        message: "Job not created",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: newJob,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getJobsCreated = async (req, res) => {
  try {
    const adminId = req.user;
    const jobsCreated = await JobModel.find({
      createdBy: adminId,
    }).populate("company");
    if (!jobsCreated || jobsCreated.length === 0) {
      return res.status(404).json({
        message: "No jobs Created available",
        success: false,
      });
    }
    return res.status(201).json({
      jobsCreated,
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

export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    await ApplicationModel.deleteMany({ job: jobId });
    const job = await JobModel.findByIdAndDelete(jobId);

    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }
    return res.status(201).json({
      jobDeleted: job,
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
//for students
export const getAllJob = async (req, res) => {
  try {
    const keyword = req.query.keyword?.trim();
    let query = {};
    
    if (keyword && keyword.length > 0) {
      const regex = new RegExp(keyword, 'i');   
      query = {
        $or: [
          { title: regex },
          { description: regex },
          { location: regex },
          { jobType: regex },
        ],
      };
    }
    
    const jobs = await JobModel.find(query)
      .populate("company")
      .populate("createdBy")
      .sort({ createdAt: -1 });
    if (!jobs.length) {
      return res.status(404).json({
        message: "No jobs available",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: e.message,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await JobModel.findById(jobId).populate({
      path: "applications",
      populate: {
        path: "applicant",
        select: "_id", // Just get the IDs to keep the response small
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: e.message,
    });
  }
};

//update Job

export const updateJob = async (req, res) => {
  try {
    const userId = req.user;
    const {
      title,
      description,
      salary,
      requirements,
      location,
      jobType,
      position,
      company,
      experience,
    } = req.body;

    let formattedRequirements = requirements;
    if (typeof requirements === "string") {
      formattedRequirements = requirements
        .split(",")
        .map((requirement) => requirement.trim());
    }

    const jobId = req.params.id;
    const job = await JobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "No such Job exists",
      });
    }

    const updatedJob = await JobModel.findByIdAndUpdate(
      jobId,
      {
        title,
        description,
        salary,
        requirements: formattedRequirements,
        location,
        jobType,
        position,
        company,
        createdBy: userId,
        experience,
      },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(400).json({
        success: false,
        message: "Job not updated",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
