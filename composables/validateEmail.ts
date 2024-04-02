const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,4}$/;
export const validateEmail = (value: string) => {
  return emailRegex.test(value);
};
