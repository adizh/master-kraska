export type AddressList = {
  name: string;
  location: string;
  phone: string;
  time: string;
  email: string;
};


export interface InputProperties {
  value: string;
  error: string;
}


export interface Inputs {
  name: InputProperties;
  surname: InputProperties;
  email: InputProperties;
  password: InputProperties;
  passwordRepeat: InputProperties;
  phone: InputProperties;
}
export interface LoginInputs{
  email: InputProperties;
  password: InputProperties;
}