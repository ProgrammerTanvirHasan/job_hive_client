import { Request, Response } from "express";
import { jobService } from "./job.service";

const createJob = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.user?.id);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const job = await jobService.createJob(req.body, userId);

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
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
    const job = await jobService.getJobById(Number(req.params.id));

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
    const userId = Number(req.user?.id);

    const job = await jobService.updateJob(
      Number(req.params.id),
      req.body,
      userId,
    );

    return res.status(200).json({
      success: true,
      message: "Job updated",
      data: job,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteJob = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.user?.id);

    await jobService.deleteJob(Number(req.params.id), userId);

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
    const job = await jobService.approveJob(Number(req.params.id));

    return res.status(200).json({
      success: true,
      message: "Job approved",
      data: job,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
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
