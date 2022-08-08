import { Request, Response } from "express";
import userService from "@services/user.service";
import { CreateUserDTO } from "@interface/user.dto";
import { fail } from "@modules/response";
import statusCode from "@modules/statusCode";

const createUser = async (req: Request, res: Response) => {
  const createUserDto: CreateUserDTO = req.body;
  try {
    const result = await userService.createUser(createUserDto);

    return res.status(statusCode.OK).send(result);
  } catch (err: any) {
    return res.status(err.statusCode).send(fail(err.statusCode, err.message));
  }
};

export default { createUser };
