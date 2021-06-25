import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const userRepositories = getCustomRepository(UserRepositories);
  
  const { admin } = await userRepositories.findOne(request.userId);

  if (admin) {
    return next();
  }

  return response.status(401).json({
    error: "User has not privileges enough!"
  })
}