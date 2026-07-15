import { NavLink, Link } from "react-router-dom";

function NavLinks() {
  return (
    <div className="flex items-center gap-8">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "font-semibold text-indigo-600"
            : "text-gray-600 hover:text-indigo-600"
        }
      >
        Home
      </NavLink>

      <Link
        to="/#features"
        className="text-gray-600 transition hover:text-indigo-600"
      >
        Features
      </Link>
    </div>
  );
}

export default NavLinks;
