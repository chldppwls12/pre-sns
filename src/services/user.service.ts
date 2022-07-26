import { success } from "src/modules/response";
import message from "@modules/message";
import statusCode from "@modules/statusCode";
import { CreateUserDto } from "@interface/user/createUser.dto";
import { User } from "@entity/User";
import AppDataSource from "@config/data-source";
import logger from "@config/logger";
import setError from "@modules/setError";
import passwordEncrypt from "@modules/password";

const createUser = async (createUserDto: CreateUserDto) => {
  const { email, password } = createUserDto;
  try {
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo
      .createQueryBuilder()
      .where("User.email = :email", { email })
      .getOne();

    if (user) {
      return setError(statusCode.BAD_REQUEST, message.DUPLICATE_EMAIL);
    }

    const { encryptedPassword, salt, iv } = passwordEncrypt(password);

    await userRepo
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        email,
        password: encryptedPassword,
        salt,
        iv,
      })
      .execute();

    return success(statusCode.OK, message.SUCCESS);
  } catch (err) {
    console.log(err);
    logger.info(`createUser Service Err: ${err}`);
    return setError(statusCode.SERVICE_UNAVAILABLE, message.INTERNAL_SERVER_ERROR);
  }
};

export default {
  createUser,
};
