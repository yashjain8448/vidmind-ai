import { createContext, useState } from "react";

const LoginModalContext = createContext();

export function LoginModalProvider({ children }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const value = {
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
  };

  return (
    <LoginModalContext.Provider value={value}>
      {children}
    </LoginModalContext.Provider>
  );
}

export default LoginModalContext;