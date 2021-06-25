import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      message: "Token is missing"
    })
  }
  const token = prepareToken(authToken);
  try {
    const { sub } = verify(token, "208784feb4163b36d766e7cbf8e42206") as IPayLoad;
    request.userId = sub;
  } catch(err) {
    return response.status(401).json({
      message: "Token is invalid!"
    })
  } 
  
  return next();
}

export function prepareToken(authToken: string) {
  const [, token] = authToken.split(" ");
  return token;
}