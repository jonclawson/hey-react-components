import React, { useEffect, useState } from 'react';


export const useInjectStyle = (styles: string) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    setIsLoading(false);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [styles]);


  return { isLoading };
};