// handleValues.ts

export const useInputValidation = () => {
  const {t}=useI18n()
  const handleValues = (
    inputs: any,
    fieldName: string,
    validationType: string | any
  ) => {


    console.log('input',inputs)
    console.log('fieldName',fieldName)
    console.log('validationType',validationType)
    const value = inputs[fieldName].value;
console.log('what is value',value)
    inputs[fieldName].value = value;

    inputs[fieldName].error = "";

    if (validationType === "string") {
      if (value === "") {
        inputs[fieldName].error = t('requiredField');
      }
    } else if (validationType === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        inputs[fieldName].error = t('incorrectEmail');
      }
    } else if (validationType === "number") {
      if (value === "") {
        inputs[fieldName].error = t('requiredField');
      }
    } else if (validationType === "rating") {
      if (value <= 0) {
        inputs[fieldName].error =t('requiredField');
      }
    } else if (validationType === "password") {
      inputs[fieldName].error =
        value?.length < 8 ? t('passwordRequire') : "";
    } else if (validationType === "passwordRepeat") {
      inputs[fieldName].error =
        value !== inputs.password.value
          ? t('passwordSync')
          : !value
              ?t('requiredField')
              : "";
    }
  };

  return { handleValues };
};
