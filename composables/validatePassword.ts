export const validatePassword = (value: string) => {
  return value.length > 8;
};

export const validateRepeatPassword = (
  password: string,
  newPassword: string
) => {
  if (newPassword?.length > 0) {
    return password === newPassword;
  }
};
