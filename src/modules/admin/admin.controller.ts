import { Request, Response } from "express";
import { adminService } from "./admin.service";

const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const data = await adminService.getDashboardStats();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
///////////////////////

const deleteCompanyJobs = async (req: Request, res: Response) => {
  try {
    const { company } = req.params;

    const companyName = Array.isArray(company) ? company[0] : company;

    const result = await adminService.deleteJobsByCompany(
      companyName,
      req.user?.role as string,
    );

    return res.status(200).json({
      success: true,
      message: `All jobs from ${companyName} deleted successfully`,
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const adminController = {
  getDashboardStats,
  deleteCompanyJobs,
};
