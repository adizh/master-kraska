// handleValues.ts
import { ref } from "vue";

export const useInputValidation = () => {
  const handleValues = (
    inputs: any,
    fieldName: string,
    validationType: string | any
  ) => {
    const value = inputs[fieldName].value;

    inputs[fieldName].value = value;
    console.log("value inside the composables", value);
    inputs[fieldName].error = "";

    if (validationType === "string") {
      if (value === "") {
        inputs[fieldName].error = "Это поле обязательно";
      }
    } else if (validationType === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        inputs[fieldName].error = "Неправильный формат почты";
      }
    } else if (validationType === "number") {
      if (value === "") {
        inputs[fieldName].error = "Это поле обязательно";
      }
    } else if (validationType === "rating") {
      if (value <= 0) {
        inputs[fieldName].error = "Это поле обязательно";
      }
    } else if (validationType === "password") {
      inputs[fieldName].error =
        value?.length < 8 ? "Пароль должен быть больше 8 символов" : "";
    } else if (validationType === "passwordRepeat") {
      inputs[fieldName].error =
        value !== inputs.password.value
          ? "Пароли должны совпадать"
          : !value
          ? "Это поле обязательно"
          : "";
    }
  };

  return { handleValues };
};
