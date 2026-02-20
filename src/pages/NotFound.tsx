import Header from "@/components/layouts/Header";
import Heading from "@/components/ui/Heading";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <>
      <Header />
      <main>
        <section>
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
        </section>
      </main>
    </>
  );
};

export default NotFound;
