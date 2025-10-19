"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define dealer details type
interface DealerDetails {
  Id: string | null;
  name: string;
  username: string;
  email: string;
  contactNumber: string;
  Address: string;
  companyName: string;
  password: string; // Still not recommended to store plain passwords
  PostCode:string;
  city:string;
  createdAt:Date;
}

// Define context type
interface DealerContextType {
  dealerDetails: DealerDetails;
  updateDealerDetails: (updatedFields: Partial<DealerDetails>) => void;
  resetPassword: (currentPassword: string, newPassword: string) => boolean;
}

// Props for provider
interface DealerProviderProps {
  children: ReactNode;
}

// Create context with default undefined
const DealerContext = createContext<DealerContextType | undefined>(undefined);

export const DealerProvider = ({ children }: DealerProviderProps) => {
  const [dealerDetails, setDealerDetails] = useState<DealerDetails>({
    Id: null,
    name: "",
    username: "",
    email: "",
    contactNumber: "",
    Address: "",
    companyName: "",
    password: "",
    PostCode:"",
    city:"",
    createdAt: new Date(),
  });

  const updateDealerDetails = (updatedFields: Partial<DealerDetails>) => {
    setDealerDetails((prevDetails) => ({
      ...prevDetails,
      ...updatedFields,
    }));
  };

  const resetPassword = (currentPassword: string, newPassword: string) => {
    if (dealerDetails.password === currentPassword) {
      updateDealerDetails({ password: newPassword });
      return true;
    }
    return false;
  };

  return (
    <DealerContext.Provider value={{ dealerDetails, updateDealerDetails, resetPassword }}>
      {children}
    </DealerContext.Provider>
  );
};

// Custom hook to access DealerAdmin context
export const useDealerAdmin = (): DealerContextType => {
  const context = useContext(DealerContext);
  if (!context) throw new Error("useDealerAdmin must be used within a DealerProvider");
  return context;
};
