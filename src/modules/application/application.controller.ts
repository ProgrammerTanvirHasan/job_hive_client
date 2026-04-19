import { Request, Response } from "express";
import { applicationService } from "./application.service";
import { applicationSchema } from "./validation";

const applyJob = async (req: Request, res: Response) => {
  try {
    const parsedData = applicationSchema.parse(req.body);

    const userId = req.user?.id;

    if (!userId) {
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
      message: error.message,
    });
  }
};

const getApplications = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const apps = await applicationService.getApplications(userId);

    return res.status(200).json({
      success: true,
      data: apps,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getApplicationsByJob = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const jobId = Number(req.params.jobId);
    const role = req.user?.role;

    if (!userId || !role) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const data = await applicationService.getApplicationsByJob(
      userId,
      jobId,
      role,
    );

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};

export const applicationController = {
  applyJob,
  getApplications,
  getApplicationsByJob,
};
