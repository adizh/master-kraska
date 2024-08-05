export const formatPhone = (phone: string) => {
  return phone?.replace(/\s+/g, "").replace("+", "");
};
