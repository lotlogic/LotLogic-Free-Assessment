import { classList } from "@/utils/tailwind";
import { Link } from "react-router-dom";

export const Header = () => {
  const nav = [
    // { label: "About", url: "/about" },
    // { label: "FAQ", url: "/faq" },
    { label: "Privacy", url: "/privacy" },
  ];

  return (
    <>
      <header className="fixed w-full top-0 bg-white z-10 shadow">
        <a
          href="#main-content"
          className={classList(
            "sr-only",
            "focus:not-sr-only",
            "focus:absolute top-2 left-2",
            "bg-mow-navy",
            "text-white",
            "px-4! py-2!",
            "rounded-md",
            "z-50",
          )}
        >
          Skip to main content
        </a>
        <div className="max-w-360 px-4 md:px-8 mx-auto">
          <div className="flex justify-between items-center h-15">
            <Link
              to="/"
              className="flex items-center rounded-md hover:opacity-80 transition-opacity"
              aria-label="Meals on Wheels NSW - Go to homepage"
            >
              <svg
                width={50}
                height={50}
                viewBox="0 0 100 100"
                className="text-primary"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M68.58 48.31C69.48 47.76 70.36 47.13 71.17 46.43C75.89 42.26 78.33 36.28 77.8 29.98C77 19.88 68.11 12 57.61 12H17V87.11H64.21C69.46 87.11 74.41 85.08 78.1 81.36C81.82 77.64 83.85 72.72 83.85 67.47C83.85 58.18 77.42 50.32 68.58 48.31ZM58.23 47.83H37.54V66.69L20.44 81.38V15.44H58.23C67.14 15.44 74.43 22.7 74.43 31.64C74.43 35.96 72.75 40.03 69.68 43.09C66.62 46.15 62.55 47.84 58.23 47.84V47.83ZM64.21 83.67H23.38L40.98 68.53V51.28H64.21C73.15 51.28 80.41 58.56 80.41 67.48C80.41 71.8 78.73 75.87 75.66 78.93C72.6 81.99 68.55 83.68 64.21 83.68V83.67Z"
                  fill="currentColor"
                />
              </svg>
              <span className="font-bold text-2xl  text-primary tracking-tight ml-1">
                BlockPlanner
              </span>
            </Link>
            <div>
              <nav className="block" role="menubar">
                <ul className="relative flex items-center gap-6 xl:gap-8">
                  {nav.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.url}
                        className="font-medium text-mow-navy hover:text-mow-teal transition-colors duration-200 rounded-md px-2 py-1"
                        role="menuitem"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              
            </div>
          </div>
        </div>

     
      </header>
    </>
  );
};

export default Header;
