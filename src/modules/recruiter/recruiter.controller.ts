import { Request, Response } from "express";
import { recruiterService } from "./recruiter.service";
import { recruiterApplySchema } from "./validation";

const applyRecruiter = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    
    const parsedData = recruiterApplySchema.parse(req.body);

    const result = await recruiterService.applyRecruiter(
      req.user.id,
      parsedData,
    );

    return res.status(201).json({
      success: true,
      message: "Recruiter application submitted",
      data: result,
    });
  } catch (err: any) {
    return res.status(400).json({
      success: false,
      message: err.errors || err.message,
    });
  }
};

const getMyRequest = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const data = await recruiterService.getMyRequest(req.user.id);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const recruiterController = {
  applyRecruiter,
  getMyRequest,
};
