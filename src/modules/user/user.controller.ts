import { Request, Response } from "express";
import { userService } from "./user.service";
import { Role } from "../../../generated/prisma";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userId = Number(req.user?.id);
    const role = req.user?.role;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (role !== Role.ADMIN && userId !== id) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    const user = await userService.getUserById(id);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUserController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userId = Number(req.user?.id);
    const role = req.user?.role;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (role !== Role.ADMIN && userId !== id) {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }

    const updatedUser = await userService.updateUser(id, req.body);

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    await userService.deleteUser(id);

    return res.status(200).json({
      success: true,
      message: "User deactivated successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const restoreUserController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await userService.restoreUser(id);

    return res.status(200).json({
      success: true,
      message: "User restored successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const userController = {
  getAllUsers,
  getUser,
  updateUserController,
  deleteUserController,
  restoreUserController,
};
