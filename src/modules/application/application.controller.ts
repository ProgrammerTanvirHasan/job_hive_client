import { Request, Response } from "express";
import { applicationService } from "./application.service";
import { applicationSchema } from "./validation";

export const applyJob = async (req: Request, res: Response) => {
  try {
    const parsedData = applicationSchema.parse(req.body);

    const userId = Number(req.user?.id);

    if (!userId || isNaN(userId)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await applicationService.applyJob(
      userId,
      parsedData.jobId,
      parsedData.resume,
      parsedData.coverLetter,
    );

    return res.status(201).json({
      success: true,
      message: "Applied successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.errors || error.message,
    });
  }
};

const getApplications = async (req: Request, res: Response) => {
  try {
    const apps = await applicationService.getApplications();

    return res.status(200).json({
      success: true,
      data: apps,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch applications",
    });
  }
};

const getApplicationsByJob = async (req: Request, res: Response) => {
  try {
    const jobId = Number(req.params.id);

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Invalid job id",
      });
    }

    const application = await applicationService.getApplicationsByJob(jobId);

    return res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

export const applicationController = {
  applyJob,
  getApplications,
  getApplicationsByJob,
};
