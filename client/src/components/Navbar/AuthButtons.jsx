import useAuth from "../../hooks/useAuth";
import useLoginModal from "../../hooks/useLoginModal";
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, LogOut, ChevronDown, HistoryIcon } from "lucide-react";

function AuthButtons() {
  const { user, loading, logout } = useAuth();
  const { openLoginModal } = useLoginModal();
  const dropdownRef = useRef(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading...</p>;
  }

  if (user) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="flex items-center gap-3 rounded-lg px-3 py-2 font-medium hover:bg-gray-100"
        >
          {user.firstName} {user.lastName}
          <ChevronDown size={18} />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-xl border bg-white shadow-lg">
            <button
              className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-100"
              onClick={() => {
                navigate("/profile");
                setIsDropdownOpen(false);
              }}
            >
              <User size={18} />
              Profile
            </button>

            <Link
              to="/history"
              onClick={() => setIsDropdownOpen(false)}
              className="flex items-center gap-2 px-4 py-3 hover:bg-slate-100"
            >
              <HistoryIcon size={18} />
              History
            </Link>

            <hr />

            <button
              className="flex items-center gap-3 w-full px-4 py-3 text-left text-red-600 hover:bg-red-50"
              onClick={async () => {
                await logout();
                setIsDropdownOpen(false);
              }}
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
      onClick={openLoginModal}
    >
      Login with Google
    </button>
  );
}

export default AuthButtons;
