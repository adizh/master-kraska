export type AddressList = {
  id: string;
  nameRu: string;
  nameKg: string;
  name: string;
  addressRu: string;
  addressKg: string;
  address: string;
  openHours: string;
  phoneNumber: string;
  email: string;
  latitude: string;
  longitude: string;
  images: null;
  isActive: boolean;
  mainShop: boolean;
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
export interface LoginInputs {
  email: InputProperties;
  password: InputProperties;
}

export type PaymentTypes =
  | 'Банковской картой'
  | 'Наличными'
  | 'MBank'
  | 'MegaPay'
  | 'Элкарт'
  | '';

export type LanguageOptions = {
  name: string;
  value: string;
};
