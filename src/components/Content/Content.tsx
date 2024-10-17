import React, { useEffect, useState } from 'react';
import styles from './Content.css';

export interface ContentProps {
  children: React.ReactNode;
}

export const Content: React.FC<ContentProps> = ({ children }) => {

  return (
    <>
    <style>{styles}</style>
    <div className="content">{children}</div>
    </>
  );  
};
export default Content;