import { Request, Response } from "express";
import { adminService } from "./admin.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await adminService.getAllUsers();
    res.json({ success: true, data: users });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const getRecruiterRequests = async (req: Request, res: Response) => {
  try {
    const requests = await adminService.getRecruiterRequests();
    res.json({ success: true, data: requests });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const approveRecruiter = async (req: Request, res: Response) => {
  try {
    const result = await adminService.approveRecruiter(Number(req.params.id));
    res.json({ success: true, message: "Approved", data: result });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const rejectRecruiter = async (req: Request, res: Response) => {
  try {
    const result = await adminService.rejectRecruiter(Number(req.params.id));
    res.json({ success: true, message: "Rejected", data: result });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const adminController = {
  getAllUsers,
  getRecruiterRequests,
  approveRecruiter,
  rejectRecruiter,
};
