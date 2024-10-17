import React, { useEffect, useState } from 'react';
import styles from './Button.css';

export interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {

  return (
    <>  
    <style>{styles}</style>
    <button className="button" onClick={onClick}>{label}</button>
    </>
  );
};

export default Button;