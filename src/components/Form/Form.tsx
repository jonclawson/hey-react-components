import React from 'react';
import { FormProvider } from './FormContext';
import styles from './Form.css';

export interface FormProps {
  onSubmit: (values: Record<string, any>) => void;
  children: React.ReactNode;
}

export const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values: Record<string, any> = {};
    formData.forEach((value, key) => {
      values[key] = value;
    });
    onSubmit(values);
  };

  return (
    <>
      <style>{styles}</style>
      <FormProvider>
        <form onSubmit={handleSubmit}>
          {children}
        </form>
      </FormProvider>
    </> 
  );
};

export default Form;