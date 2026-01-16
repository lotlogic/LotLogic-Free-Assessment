import { brand, colors } from "@/constants/content";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <header className="fixed w-full top-0 bg-white z-10 shadow">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute top-2 left-2 bg-mow-navy text-white !px-4 !py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        <div className="max-w-[1440px] px-4 mx-auto">
          <div className="flex justify-between items-center h-[60px]">
            <Link
              to="/"
              className="flex items-center rounded-md hover:opacity-80 transition-opacity"
              aria-label="Meals on Wheels NSW - Go to homepage"
            >
              <img
                src={brand.logo}
                alt={brand.logoAlt}
                width={40}
                height={40}
              />
              <span
                className="ml-3 text-2xl font-bold tracking-tight"
                style={{ color: colors.primary }}
              >
                {brand.title}
              </span>
            </Link>
            <div>
              <nav className="hidden lg:block" role="menubar">
                <ul className="relative flex items-center gap-6 xl:gap-8">
                  <li>
                    <Link
                      to="/about"
                      className="font-medium text-mow-navy hover:text-mow-teal transition-colors duration-200 rounded-md px-2 py-1"
                      role="menuitem"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/faq"
                      className="font-medium text-mow-navy hover:text-mow-teal transition-colors duration-200 rounded-md px-2 py-1"
                      role="menuitem"
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="flex items-center gap-4">
                <button
                  className="lg:hidden p-2 text-gray-600 hover:text-mow-teal transition-colors duration-200 rounded-md"
                  aria-label="Open mobile menu"
                  aria-expanded="false"
                  aria-controls="mobNav"
                  data-mob-open
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <aside
          id="mobNav"
          className="fixed top-0 left-full px-4 w-screen h-screen bg-white z-50 transition-left duration-300 ease-out [&amp;[data-open]]:left-0 lg:hidden"
        >
          <div className="relative flex flex-col justify-between max-w-lg h-full gap-8 m-auto">
            <div>
              <div className="flex items-center justify-between w-full pt-12">
                <img
                  src="/logos/MOW_NSW_logo.png"
                  alt="NSW meals on wheels logo"
                  className="h-12 w-auto"
                  loading="eager"
                />
                <button
                  className="text-mow-teal"
                  aria-label="Close mobile menu"
                  aria-controls="mobNav"
                  aria-expanded="false"
                  data-mob-close
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 64 64"
                  >
                    <path
                      strokeWidth="0"
                      fill="currentColor"
                      d="M36.8033009,31.5606602 L55.1213203,49.8786797 L50.8786797,54.1213203 L32.5606602,35.8033009 L14.2426407,54.1213203 L10,49.8786797 L28.3180195,31.5606602 L10,13.2426407 L14.2426407,9 L32.5606602,27.3180195 L50.8786797,9 L55.1213203,13.2426407 L36.8033009,31.5606602 Z"
                    />
                  </svg>
                </button>
              </div>
              <ul className="relative flex flex-col gap-6 xl:gap-8">
                <li>
                  <Link
                    to="/about"
                    className="font-medium text-mow-navy hover:bg-gray-100 transition-colors duration-200 rounded-md px-4 py-2"
                    role="menuitem"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="font-medium text-mow-navy hover:bg-gray-100 transition-colors duration-200 rounded-md px-4 py-2"
                    role="menuitem"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex mb-6"></div>
          </div>
        </aside>
      </header>
    </>
  );
};

export default Header;
