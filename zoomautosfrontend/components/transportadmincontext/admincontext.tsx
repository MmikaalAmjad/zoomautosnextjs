"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

type Admin = {
  username: string;
  // add more fields if needed
};

type TransportAdminContextType = {
  TransportAdminDetails: Admin | null;
  updateTransportAdminDetails: (details: Admin) => void;
};

const TransportAdminContext = createContext<TransportAdminContextType | undefined>(undefined);

export const TransportAdminProvider = ({ children }: { children: ReactNode }) => {
  const [TransportAdminDetails, setTransportAdminDetails] = useState<Admin | null>(null);

  const updateTransportAdminDetails = (details: Admin) => {
    setTransportAdminDetails(details);
  };

  return (
    <TransportAdminContext.Provider value={{ TransportAdminDetails, updateTransportAdminDetails }}>
      {children}
    </TransportAdminContext.Provider>
  );
};

export const useTransportAdmin = () => {
  const context = useContext(TransportAdminContext);
  if (!context) throw new Error('useTransportAdmin must be used within a TransportAdminProvider');
  return context;
};
