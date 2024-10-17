import React, { createContext, useContext, useState } from 'react';

export interface FormContextType {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  setFieldValue: (name: string, value: any) => void;
  setFieldTouched: (name: string) => void;
  setFieldError: (name: string, error: string) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const setFieldValue = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const setFieldTouched = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const setFieldError = (name: string, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  return (
    <FormContext.Provider value={{ values, errors, touched, setFieldValue, setFieldTouched, setFieldError }}>
      {children}
    </FormContext.Provider>
  );
};