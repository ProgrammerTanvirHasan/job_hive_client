import { Request, Response } from "express";
import { userService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(Number(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const updateUserController = async (req: Request, res: Response) => {
  try {
    const updatedUser = await userService.updateUser(
      Number(req.params.id),
      req.body,
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const deleteUserController = async (req: Request, res: Response) => {
  try {
    await userService.deleteUser(Number(req.params.id));
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const userController = {
  getAllUsers,
  getUser,
  updateUserController,
  deleteUserController,
};
