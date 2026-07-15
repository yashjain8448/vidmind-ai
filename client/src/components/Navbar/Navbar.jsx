import Logo from "./Logo";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";

function Navbar() {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />

        <NavLinks />

        <AuthButtons />
      </nav>
    </header>
  );
}

export default Navbar;
