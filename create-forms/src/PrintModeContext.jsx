import React, { createContext, useState } from 'react';

export const PrintModeContext = createContext();

export const PrintModeProvider = ({ children }) => {
  const [isPrintMode, setIsPrintMode] = useState(false);

  return (
    <PrintModeContext.Provider value={{ isPrintMode, setIsPrintMode }}>
      {children}
    </PrintModeContext.Provider>
  );
};

export const usePrintMode = () => React.useContext(PrintModeContext);
