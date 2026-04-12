import { Request, Response } from "express";
import { applicationService } from "./application.service";

const applyJob = async (req: Request, res: Response) => {
  const { jobId, resume, coverLetter } = req.body;
  const userId = req.user.id;
  const application = await applicationService.applyJob(
    userId,
    jobId,
    resume,
    coverLetter,
  );
  res.json(application);
};

const getApplications = async (req: Request, res: Response) => {
  const apps = await applicationService.getApplications();
  res.json(apps);
};
const getApplicationsByJob = async (req: Request, res: Response) => {
  try {
    const application = await applicationService.getApplicationsByJob(
      Number(req.params.id),
    );
    if (!application)
      return res.status(404).json({ message: "Application not found" });
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
export const applicationController = {
  applyJob,
  getApplications,
  getApplicationsByJob,
};
