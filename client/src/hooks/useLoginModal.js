import { useContext } from "react";
import LoginModalContext from "../context/LoginModalContext";

function useLoginModal() {
  return useContext(LoginModalContext);
}

export default useLoginModal;