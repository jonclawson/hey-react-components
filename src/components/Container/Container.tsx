import React from 'react';
import styles from './Container.css';

export interface ContainerProps {
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
  <>
    <style>{styles}</style>
    <div className="container">{children}</div>
  </>
  );
};
export default Container;