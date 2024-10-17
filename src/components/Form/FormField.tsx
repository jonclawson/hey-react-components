import React from 'react';
import { useFormContext } from './FormContext';

export interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  validate?: (value: any) => string | undefined;
}

const FormField: React.FC<FormFieldProps> = ({ name, label, type = 'text', validate }) => {
  const { values, errors, touched, setFieldValue, setFieldTouched, setFieldError } = useFormContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFieldValue(name, value);
    if (validate) {
      const error = validate(value);
      setFieldError(name, error || '');
    }
  };

  const handleBlur = () => {
    setFieldTouched(name);
    if (validate) {
      const error = validate(values[name]);
      setFieldError(name, error || '');
    }
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={values[name] || ''}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched[name] && errors[name] && <div className="error">{errors[name]}</div>}
    </div>
  );
};

export default FormField;