import { Request, Response } from "express";
import { jobService } from "./job.service";

const createJob = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const job = await jobService.createJob(req.body, userId);

    res.status(201).json({
      success: true,
      message: "Job created (pending approval)",
      data: job,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllJob = async (req: Request, res: Response) => {
  try {
    const jobs = await jobService.getAllJobs();

    return res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getJobById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const job = await jobService.getJobById(id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateJob = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const role = req.user?.role;

    if (!userId || !role) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const job = await jobService.updateJob(
      Number(req.params.id),
      req.body,
      userId,
      role,
    );

    res.json({ success: true, message: "Updated", data: job });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
const deleteJob = async (req: Request, res: Response) => {
  try {
    const userId = (req.user?.id);
    const role = req.user?.role;

    if (!userId || !role) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await jobService.deleteJob(Number(req.params.id), userId, role);

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const approveJob = async (req: Request, res: Response) => {
  try {
    const jobId = Number(req.params.id);

    const job = await jobService.approveJob(jobId);

    return res.status(200).json({
      success: true,
      message: "Job approved & user upgraded to recruiter",
      data: job,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const rejectJob = async (req: Request, res: Response) => {
  try {
    const { feedback } = req.body;

    const job = await jobService.rejectJob(Number(req.params.id), feedback);

    return res.status(200).json({
      success: true,
      message: "Job rejected",
      data: job,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const jobController = {
  createJob,
  getAllJob,
  getJobById,
  updateJob,
  deleteJob,
  approveJob,
  rejectJob,
};
