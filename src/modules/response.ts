const success = (status: number, message: string, data?: any) => {
  return {
    status,
    isSuccess: true,
    message,
    data,
  };
};

const fail = (status: number, message: string) => {
  return {
    status,
    isSuccess: false,
    message,
  };
};

export { success, fail };
