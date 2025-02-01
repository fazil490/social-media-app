import { createContext, ReactNode, useContext, useState } from "react";

interface HomeContextType {
  isLogoutModalOpen: boolean;
  isShareModalOpen: boolean;
  postUrl: string | null;
  openModal: () => void;
  closeModal: () => void;
  openShare: () => void;
  closeShare: () => void;
  setPostUrl: (url: string) => void;
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

interface HomeProviderType {
  children: ReactNode;
}

export const HomeProvider: React.FC<HomeProviderType> = ({ children }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [postUrl, setPostUrl] = useState<string | null>(null);
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
        postUrl,
        setPostUrl,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error("useHomeContext must be used within a HomeProvider");
  }
  return context;
};
