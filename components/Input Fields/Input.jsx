import { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
const Input = ({ name, label, ...rest }) => {
  const inputRef = useRef();

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: (ref) => {
        return ref.value;
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <label htmlFor={fieldName}>{label}</label>
      <input id={fieldName} ref={inputRef} defaultValue={defaultValue} {...rest} />

      {error && <p>{error}</p>}
    </>
  );
};

export default Input;
