import Main from "@/components/layouts/Main";
import Heading from "@/components/ui/Heading";
import { motion as m } from "framer-motion";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <Main>
      <m.section
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto text-lg px-4 py-12 text-center prose">
          <Heading tag="h1" size="h1">
            404 - Page Not Found
          </Heading>
          <p className="sm:text-balance">
            The page you are looking for does not exist. Maybe the address was
            wrong?
          </p>
          <Link to="/">Go to Home Page</Link>
        </div>
      </m.section>
    </Main>
  );
};

export default NotFound;
