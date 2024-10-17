import React from 'react';

export interface CardProps {
  title: string;
  content: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, content, children }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
      <h2>{title}</h2>
      <p>{content}</p>
      {children}
    </div>
  );
};

export default Card;