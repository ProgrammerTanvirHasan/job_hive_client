import { Request, Response } from "express";
import { jobService } from "./job.service";


const createJob = async (req: Request, res: Response) => {
  try {
    const job = await jobService.createJob(req.body, req.user.id);
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const getAllJob = async (req: Request, res: Response) => {
  try {
    const jobs = await jobService.getAllJobs();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const getJobById = async (req: Request, res: Response) => {
  try {
    const job = await jobService.getJobById(Number(req.params.id));
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const updateJob = async (req: Request, res: Response) => {
  try {
    const job = await jobService.updateJob(Number(req.params.id), req.body);
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const deleteJob = async (req: Request, res: Response) => {
  try {
    await jobService.deleteJob(Number(req.params.id));
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const approveJob = async (req: Request, res: Response) => {
  try {
    const job = await jobService.approveJob(Number(req.params.id));
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const rejectJob = async (req: Request, res: Response) => {
  try {
    const { feedback } = req.body;
    const job = await jobService.rejectJob(Number(req.params.id), feedback);
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
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
