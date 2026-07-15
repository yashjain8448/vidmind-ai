import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import LoginModal from "../components/LoginModal";
import { loginWithGoogle } from "../services/authService";
import useLoginModal  from "../hooks/useLoginModal";

function MainLayout() {
  const { isLoginModalOpen, closeLoginModal } = useLoginModal();

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onGoogleLogin={loginWithGoogle}
      />
    </>
  );
}

export default MainLayout;
