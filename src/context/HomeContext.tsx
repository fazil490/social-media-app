import { createContext, ReactNode, useContext, useState } from "react";

interface HomeContextType {
  isLogoutModalOpen: boolean;
  isShareModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  openShare: () => void;
  closeShare: () => void;
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

interface HomeProviderType {
  children: ReactNode;
}

export const HomeProvider: React.FC<HomeProviderType> = ({ children }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const openModal = () => setIsLogoutModalOpen(true);
  const closeModal = () => setIsLogoutModalOpen(false);
  const openShare = () => setIsShareModalOpen(true);
  const closeShare = () => setIsShareModalOpen(false);
  return (
    <HomeContext.Provider
      value={{
        isLogoutModalOpen,
        isShareModalOpen,
        openModal,
        closeModal,
        openShare,
        closeShare,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  return useContext(HomeContext);
};
