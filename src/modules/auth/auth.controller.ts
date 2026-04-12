// src/modules/auth/auth.controller.ts
import { Request, Response } from "express";
import * as authService from "./auth.service";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const user = await authService.registerUser(name, email, password);

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await authService.loginUser(email, password);

    res.json({
      message: "Login successful",
      ...result,
    });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};