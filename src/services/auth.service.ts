import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "@/config";
import { UserModel } from "@/models";

export function generateJwtSessionToken(userId: string) {
  return jwt.sign({ _id: userId }, config.jwtSecret, { expiresIn: "1d" });
}

export function verifyJwtSessionToken(token: string): { _id: string } {
  return jwt.verify(token, config.jwtSecret) as { _id: string };
}

export async function createUserService(userDto: {
  username: string;
  email: string;
  password: string;
}) {
  const hashedPassword = await bcrypt.hash(userDto.password, 10);
  const newUser = await UserModel.create({
    ...userDto,
    password: hashedPassword,
  });

  return newUser;
}
