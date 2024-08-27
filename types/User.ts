export type User = {
  address: string;
  createdAt?: string;

  email: string;

  firstName: string;

  id?: string;

  image?: null | string;

  isVerified?: boolean;

  lastName: string;

  password?: string;
  phoneNumber: string;
  role?: number;
  token?: string;
  verificationCode?: string;
};

export type Roles = "Admin" | "SuperAdmin" | "CustomerUser" | undefined;
