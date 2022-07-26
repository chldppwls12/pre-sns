import { ResError } from "@interface/common/resError.dto";

const setError = (statusCode: number, message: string) => {
  const resErr: ResError = {
    statusCode,
    message,
  };

  return resErr;
};

export default setError;
