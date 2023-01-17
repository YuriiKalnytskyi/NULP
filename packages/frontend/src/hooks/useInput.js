import { useEffect, useState } from 'react';

const useValidator = (value, validators) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [minLengthError, setMinLength] = useState(false);
  const [maxLengthError, setMaxLength] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    for (const validator in validators) {
      switch (validator) {
        case 'minLength':
          value.length < validators[validator] ? setMinLength(true) : setMinLength(false);
          break;
        case 'maxLength':
          value.length > validators[validator] ? setMaxLength(true) : setMaxLength(false);
          break;
        case 'isEmpty':
          value ? setIsEmpty(false) : setIsEmpty(true);
          break;

        case 'emailValid':
          /[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+/.test(value)
            ? setEmailError(false)
            : setEmailError(true);
          break;
        default:
          break;
      }
    }
  }, [value, validators]);

  useEffect(() => {
    if (isEmpty || minLengthError || emailError || maxLengthError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthError, emailError, maxLengthError]);

  return {
    isEmpty,
    inputValid,
    minLengthError,
    maxLengthError,
    emailError
  };
};
const useHandlerErrorValidator = (inputName) => {
  const [error, setError] = useState({ flag: false, message: '' });

  useEffect(() => {
    if (inputName.minLengthError) {
      setError({ flag: true, message: 'Некоректна довжина' });
    }
    if (inputName.maxLengthError) {
      setError({ flag: true, message: 'Некоректна довжина' });
    }
    if (inputName.emailError) {
      setError({ flag: true, message: 'Некоректна email' });
    }
    if (inputName.isEmpty) {
      setError({ flag: true, message: 'Поле не може бути пусте' });
    }
    if (
      inputName.isDirty &&
      !inputName.emailError &&
      !inputName.minLengthError &&
      !inputName.maxLengthError &&
      !inputName.isEmpty
    ) {
      setError({ flag: false, message: '' });
    }
  }, [
    inputName.emailError,
    inputName.minLengthError,
    inputName.isEmpty,
    inputName.isDirty,
    inputName.maxLengthError
  ]);

  return {
    flag: error.flag,
    message: error.message
  };
};

export const useInput = (initialValue, validators) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);

  const valid = useValidator(value, validators);

  const { flag, message } = useHandlerErrorValidator({ isDirty, ...valid });

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onBlur = () => {
    setIsDirty(true);
  };
  const setInputValid = () => {
    setValue('');
    setIsDirty(false);
  };

  return {
    flag,
    message,
    value,
    isDirty,
    onChange,
    onBlur,
    setInputValid,
    ...valid
  };
};
